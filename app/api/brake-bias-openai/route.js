// app/api/brake-bias-openai/route.js
import { NextResponse } from 'next/server';
import { generateOpenAIContent } from '@/lib/api/openai';
import { fetchWikimediaData } from '@/lib/api/wikimedia';
import { getCache, setCache } from '@/lib/cache';

export async function POST(request) {
  const { year, make, model, submodel, zipcode } = await request.json();
  const fullVehicleName = submodel ? `${year} ${make} ${model} ${submodel}` : `${year} ${make} ${model}`;
  
  // Check for complete cached response first
  const fullCacheKey = `complete-${fullVehicleName.replace(/\s/g, '-')}`;
  const cachedResponse = getCache(fullCacheKey);
  if (cachedResponse) {
    console.log(`[Cache] HIT for complete response: ${fullCacheKey}`);
    return NextResponse.json(cachedResponse);
  }

  try {
    // Fetch Wikimedia data in parallel with the AI call
    const wikimediaPromise = fetchWikimediaData(fullVehicleName);
    
    // Prepare context for the AI
    const priceInstruction = zipcode 
      ? `Find the average used price for this model in the market around zip code ${zipcode}.`
      : `Find the national average used price for this model.`;
      
    // Construct the AutoTempest link with the new submodel logic
    const autoTempestParams = {
        make,
        model,
        minyear: year,
        maxyear: year
    };
    if (submodel) {
        autoTempestParams.trim_kw = submodel;
    }
    if (zipcode) {
        autoTempestParams.zip = zipcode;
        autoTempestParams.radius = 200;
    }
    const autoTempestLink = `https://www.autotempest.com/results?${new URLSearchParams(autoTempestParams).toString()}`;
      
    const prompt = `
      You are "Brake Bias", an expert automotive research assistant. Generate a complete and factually accurate JSON object for the **${fullVehicleName}**.

      **CRITICAL DIRECTIVES:**
      1.  **ACCURACY IS PARAMOUNT:** Your highest priority is factual accuracy. Use real data when available.
      2.  **INDEPENDENT RESEARCH:** Treat each key in the JSON object as a separate, mandatory research task.
      3.  **HANDLE MISSING DATA:** Only after an exhaustive search fails, return "Data Not Available" for text fields, or an empty array \`[]\` for array fields.

      **Required JSON Response Format:**
      {
        "yearMakeModel": "${fullVehicleName}",
        "tldr": "string (brief summary of the vehicle)",
        "msrp": "string (Original MSRP when new)",
        "usedAvg": "string (${priceInstruction})",
        "drivetrain": "string (AWD/FWD/RWD)",
        "engine": "string (Include displacement, cylinders, HP and Torque)",
        "transmission": "string",
        "reviews": [{"source": "string", "sentiment": "string", "text": "string", "link": "string", "review_year": number, "disclaimer": "string | null"}],
        "ownerSentiment": {
          "source": "Reddit", 
          "sentiment": "string (positive/negative/mixed)", 
          "text": "string (General owner consensus)",
          "discussion_links": [],
          "keywords": { "positive": ["string"], "negative": ["string"] }
        },
        "summary": "string (comprehensive summary)",
        "photos": ["string (List 5 common color names for this vehicle)"],
        "autoTempestLink": "${autoTempestLink}"
      }

      Return ONLY the JSON object, no additional text.
    `;

    const cacheKey = `openai-${fullVehicleName.replace(/\s/g, '-')}`;
    const aiPromise = generateOpenAIContent(prompt, cacheKey);

    // Wait for both promises to resolve
    const [wikimediaData, aiData] = await Promise.all([wikimediaPromise, aiPromise]);
    
    // Combine the results
    const finalData = {
      ...aiData,
      wikimediaImageUrl: wikimediaData.imageUrl,
      wikimediaSummary: wikimediaData.summary,
    };
    
    // Cache the complete response
    setCache(fullCacheKey, finalData);

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Error in OpenAI handler:", error);
    return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
  }
}