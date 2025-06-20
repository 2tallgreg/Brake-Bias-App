// app/api/brake-bias-openai/route.js
import { NextResponse } from 'next/server';
import { generateOpenAIContent } from '@/lib/api/openai';

export async function POST(request) {
  const { year, make, model, submodel, zipcode } = await request.json();

  if (!year || !make || !model) {
    return NextResponse.json({ error: 'Year, Make, and Model are required' }, { status: 400 });
  }

  const fullVehicleName = submodel ? `${year} ${make} ${model} ${submodel}` : `${year} ${make} ${model}`;
  const cacheKey = `openai-${fullVehicleName.replace(/\s/g, '-')}`;

  const priceInstruction = zipcode 
      ? `Find the average used price for this model in the market around zip code ${zipcode}.`
      : `Find the national average used price for this model.`;

  // The prompt is the same, instructing the AI to return our specific JSON format
  const prompt = `
      Generate a complete and factually perfect JSON object for the **${fullVehicleName}**.
      Your highest priority is factual accuracy. It is a critical failure to invent information.
      Treat each key in the JSON object as a separate, mandatory research task.
      Only after an exhaustive search fails, return "Data Not Available" for text fields, or an empty array \`[]\` for array fields.

      **Required JSON Response Format:**
      {
        "yearMakeModel": "${fullVehicleName}",
        "tldr": "string",
        "msrp": "string (Find the Original MSRP. Critical.)",
        "usedAvg": "string (${priceInstruction}. Critical.)",
        "drivetrain": "string",
        "engine": "string (Include specs like HP and Torque)",
        "transmission": "string",
        "reviews": [{"source": "string", "sentiment": "string", "text": "string", "link": "string", "review_year": "number", "disclaimer": "string | null"}],
        "ownerSentiment": {
          "source": "Reddit", "sentiment": "string", "text": "string (Synthesize a plausible summary of owner sentiment.)",
          "keywords": { "positive": ["string"], "negative": ["string"] }
        },
        "summary": "string",
        "autoTempestLink": "string (Format: 'https://www.autotempest.com/results?make=${make}&model=${model}&minyear=${year}&maxyear=${year}${zipcode ? `&zip=${zipcode}&radius=200` : ''}')"
      }
    `;

  try {
    const jsonData = await generateOpenAIContent(prompt, cacheKey);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error in OpenAI handler:", error);
    return NextResponse.json({ error: 'An error occurred while fetching the car review from OpenAI.' }, { status: 500 });
  }
}