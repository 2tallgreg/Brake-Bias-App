// app/api/brake-bias/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchReddit } from '@/lib/api/reddit'; // We'll use a helper from lib

export async function POST(request) {
  const { year, make, model, submodel, zipcode } = await request.json();

  if (!year || !make || !model) {
    return NextResponse.json({ error: 'Year, Make, and Model are required' }, { status: 400 });
  }

  const fullVehicleName = submodel ? `${year} ${make} ${model} ${submodel}` : `${year} ${make} ${model}`;

  try {
    // 1. Fetch Reddit data first
    const redditData = await searchReddit(fullVehicleName);

    // 2. Prepare context for the AI
    const redditContext = (redditData.threads && redditData.threads.length > 0)
      ? redditData.threads.map(t => `Title: ${t.title}\nContent: ${t.text}`).join('\n\n---\n\n')
      : "No relevant Reddit discussions were found.";

    const priceInstruction = zipcode 
      ? `Find the average used price for this model in the market around zip code ${zipcode}.`
      : `Find the national average used price for this model.`;
      
    // 3. Construct the main prompt for Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelAI = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `
      You are "Brake Bias", an expert automotive research assistant. Generate a complete and factually perfect JSON object for the **${fullVehicleName}**.

      **CRITICAL DIRECTIVES:**
      1.  **ACCURACY IS PARAMOUNT:** Your highest priority is factual accuracy. It is a critical failure to invent information.
      2.  **INDEPENDENT RESEARCH:** Treat each key in the JSON object as a separate, mandatory research task. You MUST find data for fields like 'msrp' and 'engine'.
      3.  **HANDLE MISSING DATA:** Only after an exhaustive search fails, return "Data Not Available" for text fields, or an empty array \`[]\` for array fields.
      4.  **Use the provided Reddit context ONLY for the 'ownerSentiment' section.**

      **Provided Reddit Content:**
      ${redditContext}
      ---
      **Required JSON Response Format:**
      {
        "yearMakeModel": "string (MUST be '${fullVehicleName}')",
        "tldr": "string",
        "msrp": "string (Find the Original MSRP. Critical.)",
        "usedAvg": "string (${priceInstruction}. Critical.)",
        "drivetrain": "string",
        "engine": "string (Include specs like HP and Torque)",
        "transmission": "string",
        "reviews": [{"source": "string", "sentiment": "string", "text": "string", "link": "string", "review_year": "number", "disclaimer": "string | null"}],
        "ownerSentiment": {
          "source": "Reddit", "sentiment": "string", "text": "string (Summarize ONLY the provided Reddit content.)",
          "discussion_links": ${JSON.stringify(redditData.threads || [])},
          "keywords": { "positive": ["string"], "negative": ["string"] }
        },
        "summary": "string",
        "photos": ["string (List 5 common color names)"],
        "autoTempestLink": "string (Format: 'https://www.autotempest.com/results?make=MAKE&model=MODEL&minyear=YEAR&maxyear=YEAR${zipcode ? `&zip=${zipcode}&radius=200` : ''}')"
      }
    `;

    // 4. Generate content and return response
    const result = await modelAI.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) { throw new Error("No valid JSON object found in the AI response."); }
    
    const jsonData = JSON.parse(jsonMatch[0]);
    return NextResponse.json(jsonData);

  } catch (error) {
    console.error("Error in main brake-bias handler:", error);
    return NextResponse.json({ error: 'An error occurred while fetching the car review.' }, { status: 500 });
  }
}