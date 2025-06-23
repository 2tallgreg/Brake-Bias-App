// app/api/rss-feed/route.js
import { NextResponse } from 'next/server';
import { getCache, setCache } from '@/lib/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

// List of RSS feeds to check for reviews
const RSS_FEEDS = [
    { name: 'Car and Driver', url: 'https://www.caranddriver.com/rss/all.xml' },
    { name: 'Jalopnik', url: 'https://jalopnik.com/rss' },
    { name: 'Road & Track', url: 'https://www.roadandtrack.com/rss/all.xml' },
    { name: 'MotorTrend', url: 'https://www.motortrend.com/rss/articles/' },
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper to safely parse XML-like text to find item details
function parseRSSItems(rssText) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(rssText)) !== null) {
        const itemContent = match[1];
        const titleMatch = /<title><!\[CDATA\[(.*?)\]\]><\/title>/.exec(itemContent);
        const linkMatch = /<link>(.*?)<\/link>/.exec(itemContent);
        const descriptionMatch = /<description><!\[CDATA\[(.*?)\]\]><\/description>/.exec(itemContent);
        const pubDateMatch = /<pubDate>(.*?)<\/pubDate>/.exec(itemContent);

        if (titleMatch && linkMatch && descriptionMatch && pubDateMatch) {
            items.push({
                title: titleMatch[1],
                link: linkMatch[1],
                description: descriptionMatch[1].replace(/<[^>]*>?/gm, '').substring(0, 200), // Clean and trim description
                pubDate: pubDateMatch[1],
            });
        }
    }
    return items;
}

// AI-powered function to classify an article and extract vehicle info
async function classifyArticle(article) {
    const prompt = `
      Analyze the following article title and description to determine if it is a vehicle review.
      If it is a review, identify the vehicle's year, make, and model.

      Title: "${article.title}"
      Description: "${article.description}"

      Respond with ONLY a valid JSON object in the following format.
      - If it is a review: {"isReview": true, "vehicle": {"year": YYYY, "make": "Vehicle Make", "model": "Vehicle Model"}}
      - If it is NOT a review: {"isReview": false, "vehicle": null}

      Do not include any other text, just the JSON object.
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return { isReview: false, vehicle: null };
    } catch (error) {
        console.error('AI classification failed for:', article.title, error);
        return { isReview: false, vehicle: null };
    }
}


export async function GET() {
    const cacheKey = 'rss-feed-articles';
    const cachedData = getCache(cacheKey);

    if (cachedData) {
        console.log('[RSS Cache] HIT');
        return NextResponse.json(cachedData);
    }
    console.log('[RSS Cache] MISS');

    try {
        const allItems = [];
        const fetchPromises = RSS_FEEDS.map(async (feed) => {
            try {
                const response = await fetch(feed.url, { next: { revalidate: 3600 } }); // Revalidate every hour
                if (!response.ok) return;
                const text = await response.text();
                const items = parseRSSItems(text);
                items.forEach(item => item.source = feed.name); // Add source name to each item
                allItems.push(...items);
            } catch (error) {
                console.error(`Failed to fetch or parse feed: ${feed.name}`, error);
            }
        });

        await Promise.all(fetchPromises);
        
        // Use AI to classify and enrich the articles
        const classificationPromises = allItems.map(async (item) => {
            const classification = await classifyArticle(item);
            if (classification.isReview) {
                return {
                    ...item,
                    ...classification.vehicle, // Adds year, make, model
                };
            }
            return null;
        });
        
        const classifiedArticles = (await Promise.all(classificationPromises)).filter(Boolean);

        // Sort by publication date, newest first
        classifiedArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        setCache(cacheKey, classifiedArticles);
        return NextResponse.json(classifiedArticles);

    } catch (error) {
        console.error("Error in rss-feed handler:", error);
        return NextResponse.json({ error: 'Failed to fetch RSS feeds.' }, { status: 500 });
    }
}