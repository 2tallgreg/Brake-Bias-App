// app/api/brake-bias-openai/route.js
import { NextResponse } from 'next/server';
import { generateOpenAIContent } from '@/lib/api/openai';
import { fetchWikimediaData } from '@/lib/api/wikimedia'; // Import the new helper

export async function POST(request) {
  const { year, make, model, submodel, zipcode } = await request.json();
  const fullVehicleName = submodel ? `${year} ${make} ${model} ${submodel}` : `${year} ${make} ${model}`;

  // ... (rest of the initial setup)

  try {
    // Fetch Wikimedia data in parallel with the AI call
    const wikimediaPromise = fetchWikimediaData(fullVehicleName);
    
    // ... (construct the prompt for the AI as before)
    const prompt = `...`; // your existing prompt
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

    return NextResponse.json(finalData);
  } catch (error) {
    console.error("Error in OpenAI handler:", error);
    return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
  }
}