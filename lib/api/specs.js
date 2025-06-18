// lib/api/specs.js
import { getClaudeResponse } from "./claude";

// Add the 'export' keyword here
export async function getSpecs(year, make, model) {
  // ... rest of the function is correct
  const prompt = `Provide the vehicle specifications for a ${year} ${make} ${model}. The response should be a JSON object with the following keys: "engine", "horsepower", "torque", "transmission", "drivetrain", "fuel_economy", "dimensions" (as an object with "length", "width", "height"), and "weight".`;
  
  try {
    const response = await getClaudeResponse(prompt);
    return JSON.parse(response);
  } catch (error) {
    console.error("Error fetching specs from Claude:", error);
    return null;
  }
}