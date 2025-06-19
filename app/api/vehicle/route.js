// app/api/vehicle/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  const { year, make, model, type } = await request.json();

  if (!type || !year || !make) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  let prompt;
  if (type === 'models') {
    prompt = `For the car make "${make}" in the year ${year}, list popular models. Respond ONLY with a valid JSON array of strings. Example: ["911", "Cayenne", "Taycan"]`;
  } else if (type === 'submodels' && model) {
    prompt = `For the vehicle "${year} ${make} ${model}", list all common submodels or trims. Respond ONLY with a valid JSON array of strings. Example: ["Base", "S", "GTS"]`;
  } else {
    return NextResponse.json({ error: 'Invalid request type or missing model' }, { status: 400 });
  }

  try {
    const result = await aiModel.generateContent(prompt);
    const text = result.response.text();
    
    // Robustly find the JSON array in the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json([]); // Return empty array if none found
    }
    
    const jsonData = JSON.parse(jsonMatch[0]);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error(`Error fetching vehicle data (type: ${type}):`, error);
    return NextResponse.json([]); // Return empty array on error to prevent frontend crashes
  }
}