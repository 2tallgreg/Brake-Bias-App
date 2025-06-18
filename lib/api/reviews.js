// lib/api/reviews.js
import { getOpenAIResponse } from "./openai";

// Add the 'export' keyword here
export async function getProfessionalReviews(year, make, model) {
  // ... rest of the function is correct
  const prompt = `Find up to 3 professional reviews for the ${year} ${make} ${model}. For each review, provide a "source_name", a "summary" of the review, the overall "sentiment" (Positive, Negative, Neutral), and a "url". Return as a JSON array.`;

  try {
    const response = await getOpenAIResponse(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error("Error fetching professional reviews from OpenAI:", error);
    return null;
  }
}