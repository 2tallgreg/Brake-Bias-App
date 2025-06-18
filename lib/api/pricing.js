// lib/api/pricing.js
import { getClaudeResponse } from "./claude";

// Add the 'export' keyword here
export async function getPricingData(year, make, model) {
  // ... rest of the function is correct
  const prompt = `Provide pricing data for a ${year} ${make} ${model}. The response should be a JSON object containing "msrp" and "used_market_avg".`;

  try {
    const response = await getClaudeResponse(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error("Error fetching pricing data from Claude:", error);
    return null;
  }
}