import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { year, make, model } = req.body;
  if (!year || !make || !model) return res.status(400).json({ message: 'Year, Make, and Model are required.' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const apiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = `For the vehicle "${year} ${make} ${model}", list common submodels or trims. Respond ONLY with a valid JSON array of strings. Example: ["Base", "S", "GTS"]`;
    const result = await apiModel.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return res.status(200).json([]);
    res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (error) {
    console.error("Error fetching submodels:", error);
    res.status(500).json([]);
  }
}