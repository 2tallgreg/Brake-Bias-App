import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { year, make } = req.body;
  if (!year || !make) return res.status(400).json({ message: 'Year and Make are required.' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = `For the car make "${make}" in the year ${year}, list popular models. Respond ONLY with a valid JSON array of strings. Example: ["911", "Cayenne"]`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return res.status(200).json([]);
    res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json([]);
  }
}