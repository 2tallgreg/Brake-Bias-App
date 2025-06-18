// lib/api/reddit.js
import { getOpenAIResponse } from "./openai";

// Add the 'export' keyword here
export async function getRedditSentiment(year, make, model) {
  // ... rest of the function is correct
  const prompt = `Summarize the general sentiment from Reddit owners for a ${year} ${make} ${model}. Provide a "summary" of the pros and cons mentioned, the overall "sentiment" (Positive, Negative, Neutral), and include 2-3 "discussion_links" to relevant threads. Return as a JSON object.`;

  try {
    const response = await getOpenAIResponse(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error("Error fetching Reddit sentiment from OpenAI:", error);
    return null;
  }
}