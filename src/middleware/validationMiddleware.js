const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }
  next();
};

const validateFAQ = (req, res, next) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ success: false, message: 'Please provide question and answer' });
  }
  next();
};

const validateAIAnswer = (req, res, next) => {
  if (!req.body.question) {
    return res.status(400).json({ success: false, message: 'Please provide a question' });
  }
  next();
};

const validateAIFaq = (req, res, next) => {
  if (!req.body.topic) {
    return res.status(400).json({ success: false, message: 'Please provide a topic' });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateFAQ,
  validateAIAnswer,
  validateAIFaq
};