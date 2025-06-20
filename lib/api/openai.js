// lib/api/openai.js
import OpenAI from 'openai';
import { getCache, setCache } from '../cache';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a JSON response from the OpenAI API.
 * @param {string} prompt - The user prompt to send to the model.
 * @param {string} cacheKey - The key for caching the result.
 * @returns {Promise<object>} - A promise that resolves to the generated JSON object.
 */
export async function generateOpenAIContent(prompt, cacheKey) {
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    console.log(`[Cache] HIT for OpenAI key: ${cacheKey}`);
    return cachedData;
  }
  console.log(`[Cache] MISS for OpenAI key: ${cacheKey}. Fetching from OpenAI API.`);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Or "gpt-3.5-turbo" for a faster, cheaper option
      messages: [
        { role: "system", content: "You are an expert automotive research assistant designed to output a single, perfect JSON object and nothing else. Do not include any explanatory text before or after the JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const resultJson = JSON.parse(completion.choices[0].message.content);
    
    setCache(cacheKey, resultJson);
    return resultJson;

  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    throw new Error("Failed to get response from OpenAI.");
  }
}