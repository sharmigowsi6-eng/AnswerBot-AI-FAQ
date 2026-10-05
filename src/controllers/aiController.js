const { generateAnswerFromAI, generateFAQPairFromAI } = require('../services/geminiService');

const generateAIAnswer = async (req, res, next) => {
  try {
    const { question } = req.body;
    const answer = await generateAnswerFromAI(question);
    res.json({ success: true, data: { question, answer } });
  } catch (error) {
    next(error);
  }
};

const generateAIFAQ = async (req, res, next) => {
  try {
    const { topic } = req.body;
    const resultText = await generateFAQPairFromAI(topic);
    
    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText.replace(/```json|```/g, '').trim());
    } catch (e) {
      parsedResult = { generatedContent: resultText };
    }

    res.json({ success: true, data: parsedResult });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateAIAnswer, generateAIFAQ };