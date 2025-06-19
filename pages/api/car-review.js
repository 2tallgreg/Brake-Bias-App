import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { year, make, model, submodel, zip } = req.body;

    if (!year || !make || !model) {
        return res.status(400).json({ message: 'Year, Make, and Model are required.' });
    }

    const fullVehicleName = submodel ? `${year} ${make} ${model} ${submodel}` : `${year} ${make} ${model}`;
    const priceInstruction = zip 
        ? `Find the average used price for this model in the market around zip code ${zip}.`
        : `Find the national average used price for this model.`;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const modelAI = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const prompt = `
            You are "Brake Bias", an expert automotive research assistant. Generate a complete and factually perfect JSON object for the **${fullVehicleName}**.

            **CRITICAL DIRECTIVES:**
            1.  **NO EXCUSES:** Every field is critical. You MUST return a value for every single field. Do not omit any.
            2.  **ACCURACY IS MANDATORY:** It is a critical failure to invent information. If data is truly unavailable after an exhaustive search, return "Data Not Available".
            3.  **VALIDATE YOUR WORK:** Before responding, double-check that all data, especially links, are relevant to the **${fullVehicleName}**.

            **JSON Response Format:**
            {
              "yearMakeModel": "string (MUST be '${fullVehicleName}')",
              "tldr": "string",
              "msrp": "string (Original MSRP. Critical.)",
              "usedAvg": "string (${priceInstruction}. Critical.)",
              "drivetrain": "string",
              "engine": "string (Include specs like HP and Torque)",
              "transmission": "string",
              "reviews": [{"source": "string", "sentiment": "string", "text": "string", "link": "string", "review_year": "number", "disclaimer": "string | null"}],
              "ownerSentiment": {
                "source": "Reddit", "sentiment": "string", "text": "string",
                "discussion_links": [{"title": "string", "link": "string"}],
                "keywords": { "positive": ["string"], "negative": ["string"] }
              },
              "summary": "string",
              "photos": ["string (List 5 common color names)"],
              "autoTempestLink": "string (Format: 'https://www.autotempest.com/results?make=MAKE&model=MODEL&minyear=YEAR&maxyear=YEAR${zip ? `&zip=${zip}&radius=200` : ''}')"
            }
        `;
        
        const result = await modelAI.generateContent(prompt);
        let text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) { throw new Error("No valid JSON object found in the AI response."); }
        
        const cleanedJsonString = jsonMatch[0];
        const jsonData = JSON.parse(cleanedJsonString);
        res.status(200).json(jsonData);

    } catch (error) {
        console.error("Error in main car review handler:", error);
        res.status(500).json({ message: "An error occurred while fetching the car review." });
    }
}