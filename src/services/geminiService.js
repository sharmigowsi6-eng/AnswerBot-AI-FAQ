const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateAnswerFromAI = async (question) => {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: `You are a helpful customer support assistant. Provide a clear, concise answer for: ${question}`,
  });
  return response.text;
};

const generateFAQPairFromAI = async (topic) => {
  const prompt = `Based on topic "${topic}", generate a JSON object with key question and answer`;
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
  });
  return response.text;
};

module.exports = { generateAnswerFromAI, generateFAQPairFromAI };