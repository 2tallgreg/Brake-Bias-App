// lib/api/brake-bias.js
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Uses Generative AI to create a TLDR and a detailed summary.
 * @param {object} summaryData - An object containing data to be summarized.
 * @returns {Promise<Object>} An object containing tldr and summary.
 */
export async function generateSummary(summaryData) {
    const { vehicle, professionalReviews, redditSentiment } = summaryData;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        Based on the following data for the ${vehicle}, generate a TLDR and a detailed summary.
        
        Professional Reviews: ${JSON.stringify(professionalReviews, null, 2)}
        Owner Sentiment: ${JSON.stringify(redditSentiment, null, 2)}

        Respond with ONLY a valid JSON object in the following format:
        {
            "tldr": "A 2-3 sentence 'too long, didn't read' overview.",
            "summary": "A 5-6 sentence detailed summary synthesizing the key findings from both professional reviews and owner sentiment."
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Could not parse AI summary response.");
    } catch (error) {
        console.error("Failed to generate summary:", error);
        return {
            tldr: "Summary could not be generated at this time.",
            summary: "An error occurred while trying to generate a detailed summary for this vehicle."
        };
    }
}