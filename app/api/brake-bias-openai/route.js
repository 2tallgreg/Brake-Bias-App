// app/api/brake-bias-openai/route.js
import { NextResponse } from 'next/server';
import { generateOpenAIContent } from '@/lib/api/openai';
import { getImages as fetchWikimediaData } from '@/lib/api/wikimedia'; // Renamed for clarity
import { getVideoReviews } from '@/lib/api/youtube';
import { getCache, setCache } from '@/lib/cache';

export async function POST(request) {
  const { year, make, model, submodel, zipcode } = await request.json();
  const fullVehicleName = submodel ? `${year} ${make} ${model} ${submodel}` : `${year} ${make} ${model}`;
  
  const fullCacheKey = `complete-v2-${fullVehicleName.replace(/\s/g, '-')}${zipcode || ''}`;
  const cachedResponse = getCache(fullCacheKey);
  if (cachedResponse) {
    console.log(`[Cache] HIT for complete response: ${fullCacheKey}`);
    return NextResponse.json(cachedResponse);
  }

  try {
    // Fetch external data in parallel
    const wikimediaPromise = fetchWikimediaData(fullVehicleName);
    const videoPromise = getVideoReviews(fullVehicleName);
    
    const priceInstruction = zipcode 
      ? `Find the average used price for this model in the market around zip code ${zipcode}.`
      : `Find the national average used price for this model.`;
      
    const autoTempestParams = { make, model, minyear: year, maxyear: year };
    if (submodel) autoTempestParams.trim_kw = submodel;
    if (zipcode) {
        autoTempestParams.zip = zipcode;
        autoTempestParams.radius = 200;
    }
    const autoTempestLink = `https://www.autotempest.com/results?${new URLSearchParams(autoTempestParams).toString()}`;
      
    const prompt = `
      You are "Brake Bias", an expert automotive research assistant. Generate a complete and factually accurate JSON object for the **${fullVehicleName}**.

      **CRITICAL DIRECTIVES:**
      1.  **ACCURACY IS PARAMOUNT:** Your highest priority is factual accuracy. Use real data.
      2.  **INDEPENDENT RESEARCH:** Treat each key in the JSON object as a separate, mandatory research task.
      3.  **NO PLACEHOLDER LINKS:** For "reviews.link", generate a plausible, direct link to an article, not a search engine. Example: "https://www.motortrend.com/reviews/2019-chevrolet-tahoe-first-test/".
      4.  **HANDLE MISSING DATA:** Only after an exhaustive search fails, return "Data Not Available" for text fields or empty arrays \`[]\` for array fields.

      **Required JSON Response Format:**
      {
        "yearMakeModel": "${fullVehicleName}",
        "tldr": "string (Brief, engaging 2-sentence summary of the vehicle's reputation.)",
        "msrp": "string (Original MSRP when new. Example: '$45,500')",
        "usedAvg": "string (${priceInstruction} Example: '$28,000')",
        "drivetrain": "string (e.g., 'AWD', 'RWD', 'FWD')",
        "engine": "string (Detailed engine specs. e.g., '3.5L Twin-Turbo V6, 450 hp, 510 lb-ft')",
        "transmission": "string (e.g., '10-Speed Automatic')",
        "reviews": [
          {
            "source": "string (e.g., 'MotorTrend')", 
            "sentiment": "string (e.g., 'Positive', 'Mixed')", 
            "text": "string (A direct, impactful quote from the review.)", 
            "link": "string (A plausible, direct link to the review article.)", 
            "review_year": ${year}, 
            "disclaimer": "string | null (Add 'AI-generated link; original text may require search.' if link is illustrative)"
          }
        ],
        "ownerSentiment": {
          "source": "Reddit", 
          "sentiment": "string (e.g., 'Largely Positive')", 
          "text": "string (Summary of owner consensus from forums like Reddit.)",
          "discussion_links": [],
          "keywords": { "positive": ["string"], "negative": ["string"] }
        },
        "summary": "string (A comprehensive 5-6 sentence summary of the vehicle, synthesizing pros and cons.)",
        "photos": ["string (List 5 common, real color names for this vehicle, e.g., 'Supersonic Red')"],
        "autoTempestLink": "${autoTempestLink}"
      }

      Return ONLY the JSON object, no additional text.
    `;

    const cacheKey = `openai-v2-${fullVehicleName.replace(/\s/g, '-')}`;
    const aiPromise = generateOpenAIContent(prompt, cacheKey);

    const [wikimediaData, videoData, aiData] = await Promise.all([wikimediaPromise, videoPromise, aiPromise]);
    
    const finalData = {
      ...aiData,
      wikimediaImageUrl: wikimediaData.imageUrl,
      wikimediaSummary: aiData.summary, // Use AI summary for main summary
      videoReviews: videoData,
    };
    
    setCache(fullCacheKey, finalData);

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Error in OpenAI handler:", error);
    return NextResponse.json({ error: 'An error occurred while generating the vehicle report.' }, { status: 500 });
  }
}