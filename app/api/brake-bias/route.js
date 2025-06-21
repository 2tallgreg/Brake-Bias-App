// app/api/brake-bias/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateOpenAIContent } from '@/lib/api/openai';

// Helper function for Reddit search (simplified for now)
async function searchReddit(vehicleName) {
  // Mock data
  return {
    threads: [
      { 
        title: `${vehicleName} Owners Thread`, 
        text: 'Great car, very reliable!',
        link: '#'
      }
    ]
  };
}

export async function POST(request) {
  const { year, make, model, submodel, zipcode } = await request.json();

  if (!year || !make || !model) {
    return NextResponse.json({ error: 'Year, Make, and Model are required' }, { status: 400 });
  }

  const fullVehicleName = submodel ? `${year} ${make} ${model} ${submodel}` : `${year} ${make} ${model}`;

  try {
    // --- PRIMARY ATTEMPT: GEMINI ---
    try {
      const modelName = 'gemini-2.5-flash';
      console.log(`Attempting to use primary model: ${modelName}`);

      const redditData = await searchReddit(fullVehicleName);
      const redditContext = (redditData.threads && redditData.threads.length > 0)
        ? redditData.threads.map(t => `Title: ${t.title}\nContent: ${t.text}`).join('\n\n---\n\n')
        : "No relevant Reddit discussions were found.";
      
      const priceInstruction = zipcode ? `Find the average used price for this model in the market around zip code ${zipcode}.` : `Find the national average used price for this model.`;
      
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
        1.  **ACCURACY IS PARAMOUNT:** Your highest priority is factual accuracy. Use real data when available.
        2.  **INDEPENDENT RESEARCH:** Treat each key in the JSON object as a separate, mandatory research task.
        3.  **HANDLE MISSING DATA:** Only after an exhaustive search fails, return "Data Not Available" for text fields, or an empty array \`[]\` for array fields.
        4.  **Use the provided Reddit context ONLY for the 'ownerSentiment' section.**

        **Required JSON Response Format:**
        {
          "yearMakeModel": "${fullVehicleName}",
          "tldr": "string (brief summary of the vehicle)",
          "msrp": "string (Original MSRP when new)",
          "usedAvg": "string (A price range, e.g., '$35,000 - $40,000'. ${priceInstruction})",
          "drivetrain": "string (AWD/FWD/RWD)",
          "engine": "string (Include displacement, cylinders, HP and Torque)",
          "transmission": "string",
          "reviews": [{"source": "string", "sentiment": "string (Detailed sentiment like 'Largely Positive', 'Mixed with caveats')", "text": "string (A meaningful quote from the review)", "link": "string", "review_year": number, "disclaimer": "string | null", "keywords": { "positive": ["string (3-5 positive keywords from the review)"], "negative": ["string (3-5 negative keywords from the review)"] }}],
          "ownerSentiment": {
            "source": "Reddit", 
            "sentiment": "string (positive/negative/mixed)", 
            "text": "string (Summarize the provided Reddit content)",
            "discussion_links": ${JSON.stringify(redditData.threads || [])},
            "keywords": { "positive": ["string"], "negative": ["string"] }
          },
          "summary": "string (comprehensive summary)",
          "photos": ["string (List 5 common color names for this vehicle)"],
          "autoTempestLink": "${autoTempestLink}"
        }

        Return ONLY the JSON object, no additional text.
      `;

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const modelAI = genAI.getGenerativeModel({ model: modelName });
      const result = await modelAI.generateContent(prompt);
      const text = result.response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) { throw new Error("No valid JSON object found in Gemini response."); }
      
      const jsonData = JSON.parse(jsonMatch[0]);
      jsonData._metadata = { modelUsed: modelName, timestamp: new Date().toISOString() };
      
      return NextResponse.json(jsonData);

    } catch (geminiError) {
      console.warn(`Primary Gemini model failed: ${geminiError.message}. Falling back to OpenAI.`);

      // --- FALLBACK ATTEMPT: OPENAI ---
      const openAiCacheKey = `openai-${fullVehicleName.replace(/\s/g, '-')}`;
      const priceInstruction = zipcode ? `Find the average used price for this model in the market around zip code ${zipcode}.` : `Find the national average used price for this model.`;
      
      const autoTempestParams = { make, model, minyear: year, maxyear: year };
      if (submodel) autoTempestParams.trim_kw = submodel;
      if (zipcode) {
          autoTempestParams.zip = zipcode;
          autoTempestParams.radius = 200;
      }
      const autoTempestLink = `https://www.autotempest.com/results?${new URLSearchParams(autoTempestParams).toString()}`;
      
      const openAiPrompt = `
        You are "Brake Bias", an expert automotive research assistant. Generate a complete and factually accurate JSON object for the **${fullVehicleName}**.
        **Required JSON Response Format:**
        {
          "yearMakeModel": "${fullVehicleName}", "tldr": "string (brief summary)", "msrp": "string (Original MSRP)", "usedAvg": "string (A price range. ${priceInstruction})", "drivetrain": "string", "engine": "string", "transmission": "string", "reviews": [{"source": "string", "sentiment": "string", "text": "string", "link": "string", "review_year": number, "disclaimer": "string | null", "keywords": { "positive": ["string"], "negative": ["string"] }}], "ownerSentiment": {"source": "Reddit", "sentiment": "string", "text": "string", "discussion_links": [], "keywords": {"positive": [], "negative": []}}, "summary": "string", "photos": [], "autoTempestLink": "${autoTempestLink}"
        }
      `;

      const aiData = await generateOpenAIContent(openAiPrompt, openAiCacheKey);
      aiData._metadata = { modelUsed: 'openai-fallback', timestamp: new Date().toISOString() };
      
      return NextResponse.json(aiData);
    }
  } catch (error) {
    console.error("Fatal error in brake-bias handler after fallback attempt:", error);
    return NextResponse.json({ 
      error: 'An error occurred while fetching the car review.', 
      details: error.message 
    }, { status: 500 });
  }
}