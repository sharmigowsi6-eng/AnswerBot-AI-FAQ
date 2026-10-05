const express = require('express');
const router = express.Router();
const { generateAnswerFromAI } = require('../services/geminiService');

router.post('/ask', async (req, res, next) => {
  try {
    const { question } = req.body;
    const answer = await generateAnswerFromAI(question);
    res.json({ answer });
  } catch (error) {
    next(error);
  }
});

module.exports = router;