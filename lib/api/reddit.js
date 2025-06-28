// lib/api/reddit.js
import { getCache, setCache } from '../cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function summarizeRedditData(posts, vehicleName) {
  const corpus = posts.map(p => `Title: ${p.title}\n${p.text}`).join('\n\n---\n\n');
  if (corpus.length === 0) {
    return {
      text: "Could not find significant discussion on Reddit for this specific model.",
      keywords: { positive: [], negative: [] }
    };
  }

  const prompt = `
    You are an automotive sentiment analyst. Based on the following Reddit posts about the ${vehicleName}, provide a concise, neutral summary of the general owner consensus. Then, extract common keywords for praises and complaints.

    **Reddit Data:**
    \`\`\`
    ${corpus.substring(0, 8000)}
    \`\`\`

    **CRITICAL:** Respond ONLY with a valid JSON object in the following format. Do not include any other text or markdown.
    {
      "text": "string (A neutral, one-paragraph summary of owner opinions, mentioning both pros and cons if present.)",
      "keywords": {
        "positive": ["string (e.g., 'fun to drive')"],
        "negative": ["string (e.g., 'infotainment issues')"]
      }
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Could not parse AI sentiment response from Reddit data.");
  } catch (error) {
    console.error("Failed to generate Reddit summary:", error);
    return {
      text: "An AI summary for Reddit sentiment could not be generated at this time.",
      keywords: { positive: [], negative: [] }
    };
  }
}

export async function getRedditSentiment(vehicleName) {
  const cacheKey = `reddit-sentiment-v2-${vehicleName.replace(/\s/g, '-')}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) {
      console.log(`[Cache] HIT for Reddit: ${cacheKey}`);
      return cachedData;
  }
  console.log(`[Cache] MISS for Reddit: ${cacheKey}`);

  // --- Expanded Subreddit Search Logic ---
  const parts = vehicleName.split(' ');
  const make = parts[1]?.toLowerCase();
  const model = parts.slice(2).join('').toLowerCase();
  const modelSpaced = parts.slice(2).join(' ').toLowerCase();

  const subredditsToSearch = new Set(['cars', 'whatcarshouldibuy', 'askcarsales']);
  if (make) subredditsToSearch.add(make);
  if (model) {
      subredditsToSearch.add(model);
      if (make) subredditsToSearch.add(`${make}${model}`);
  }
  // ---

  const searchQuery = `"${vehicleName}" OR "${make} ${modelSpaced}" (owner OR review OR issues OR reliability)`;
  console.log(`Searching subreddits: [${Array.from(subredditsToSearch).join(', ')}] for query: ${searchQuery}`);

  const searchPromises = Array.from(subredditsToSearch).map(sub =>
    fetch(`https://www.reddit.com/r/${sub}/search.json?q=${encodeURIComponent(searchQuery)}&restrict_sr=on&sort=relevance&t=all&limit=10`)
      .then(res => res.ok ? res.json() : Promise.reject(`Failed to fetch from r/${sub}`))
      .catch(err => {
        console.warn(err); // Log failed fetches but don't stop others
        return null;
      })
  );

  try {
    const results = await Promise.all(searchPromises);
    let allPosts = [];
    results.forEach(result => {
      if (result && result.data && result.data.children.length > 0) {
        allPosts = allPosts.concat(result.data.children);
      }
    });

    // Remove duplicates that might appear across different subreddit searches
    const uniquePosts = Array.from(new Map(allPosts.map(post => [post.data.id, post])).values());

    console.log(`Found ${uniquePosts.length} unique Reddit posts for summarization.`);

    const textCorpus = uniquePosts.map(post => ({
      title: post.data.title,
      text: post.data.selftext,
    }));

    const sentimentData = await summarizeRedditData(textCorpus, vehicleName);
    setCache(cacheKey, sentimentData);
    return sentimentData;

  } catch (error) {
    console.error(`Error in getRedditSentiment for ${vehicleName}:`, error);
    return {
      text: "Could not fetch Reddit sentiment at this time.",
      keywords: { positive: [], negative: [] }
    };
  }
}