// app/api/brake-bias/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateOpenAIContent } from '@/lib/api/openai';
import { searchYouTubeReviews } from '@/lib/api/youtube';

async function searchReddit(vehicleName) {
  // Mock data - in a real app, this would use Reddit API
  return {
    threads: [
      { 
        title: `Thoughts on the ${vehicleName} for a daily driver?`, 
        text: 'I\'ve had mine for about a year now. The seats are comfortable for long trips and the fuel economy is better than I expected. The infotainment system, however, can be a bit slow to boot up on cold days.',
        link: '#'
      },
      {
        title: `What's the real-world reliability of the ${vehicleName}?`,
        text: 'Generally solid. I follow the maintenance schedule closely and haven\'t had any major surprises. One common thing to watch for is the water pump, some owners have had to replace it earlier than expected. Otherwise, it\'s been a great car.',
        link: '#'
      },
      {
        title: `Just bought a ${vehicleName}! Any tips?`,
        text: 'Congrats! You\'ll love the handling, it feels very planted in corners. I\'d recommend getting a good set of all-season tires if you live in a place with a real winter, it makes a huge difference.',
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
    const youtubePromise = searchYouTubeReviews(fullVehicleName);
    const redditPromise = searchReddit(fullVehicleName);
    const [videoData, redditData] = await Promise.all([youtubePromise, redditPromise]);

    try {
      const modelName = 'gemini-1.5-pro-latest';
      console.log(`Attempting to use primary model: ${modelName}`);

      const redditContext = (redditData.threads && redditData.threads.length > 0)
        ? redditData.threads.map(t => `Title: ${t.title}\nContent: ${t.text}`).join('\n\n---\n\n')
        : "No relevant Reddit discussions were found.";
      
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
        1.  **ACCURACY IS PARAMOUNT:** Your highest priority is factual accuracy. Use real data when available.
        2.  **INDEPENDENT RESEARCH:** Treat each key in the JSON object as a separate, mandatory research task. Do not use the provided context for anything other than its specified section.
        3.  **HANDLE MISSING DATA:** Only after an exhaustive search fails, return "Data Not Available" for text fields, or an empty array \`[]\` for array fields.

        **Reddit Context:**
        ${redditContext}

        **Required JSON Response Format:**
        {
          "yearMakeModel": "${fullVehicleName}",
          "tldr": "string (brief summary of the vehicle)",
          "msrp": "string (Original MSRP when new)",
          "usedAvg": "string (A price range, e.g., '$35,000 - $40,000'. ${priceInstruction})",
          "drivetrain": "string (The primary drivetrain option, e.g., 'AWD', 'RWD')",
          "engine_options": [{"name": "string (e.g., '2.0L Turbo I4')", "specs": "string (e.g., '270 hp, 295 lb-ft')"}],
          "transmission_options": ["string (e.g., '8-speed automatic')", "string (e.g., '6-speed manual (on select trims)')"],
          "reviews": [{"source": "string", "sentiment": "string (Detailed sentiment like 'Largely Positive', 'Mixed with caveats')", "text": "string (A meaningful, direct quote from the review)", "tldr": "string (A 2-3 sentence summary of the entire professional review article)", "link": "string", "review_year": number, "disclaimer": "string | null", "keywords": { "positive": ["string (3-5 positive keywords from the review)"], "negative": ["string (3-5 negative keywords from the review)"] }}],
          "ownerSentiment": {
            "source": "Reddit", 
            "sentiment": "string (positive/negative/mixed)", 
            "text": "string (A comprehensive summary of the owner consensus, synthesizing the key points from all provided Reddit threads. Mention recurring themes like reliability, common issues, and ownership costs.)",
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
      if (!jsonMatch) { 
        throw new Error("No valid JSON object found in Gemini response."); 
      }
      
      const jsonData = JSON.parse(jsonMatch[0]);
      
      jsonData.videoReviews = videoData;
      jsonData._metadata = { modelUsed: modelName, timestamp: new Date().toISOString() };
      
      return NextResponse.json(jsonData);

    } catch (geminiError) {
      console.warn(`Primary Gemini model failed: ${geminiError.message}.`);
      return NextResponse.json({ error: 'Failed to generate review data from primary source.' }, { status: 500 });
    }
  } catch (error) {
    console.error("Fatal error in brake-bias handler:", error);
    return NextResponse.json({ 
      error: 'An error occurred while fetching external data.', 
      details: error.message 
    }, { status: 500 });
  }
}
