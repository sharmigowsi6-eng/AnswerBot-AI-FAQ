const FAQ = require('../models/FAQ');

const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category } = req.body;
    const faq = await FAQ.create({
      question,
      answer,
      category: category || 'General',
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, message: 'FAQ created successfully', data: faq });
  } catch (error) {
    next(error);
  }
};

const getAllFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find().populate('createdBy', 'name email');
    res.json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    next(error);
  }
};

const getFAQById = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id).populate('createdBy', 'name email');
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

const updateFAQ = async (req, res, next) => {
  try {
    let faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });

    if (faq.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this FAQ' });
    }

    faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, message: 'FAQ updated successfully', data: faq });
  } catch (error) {
    next(error);
  }
};

const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });

    if (faq.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this FAQ' });
    }

    await faq.deleteOne();
    res.json({ success: true, message: 'FAQ removed successfully' });
  } catch (error) {
    next(error);
  }
};

const searchFAQs = async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ success: false, message: 'Search parameter q is required' });

    const faqs = await FAQ.find({
      $or: [
        { question: { $regex: query, $options: 'i' } },
        { answer: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });

    res.json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    next(error);
  }
};

module.exports = { createFAQ, getAllFAQs, getFAQById, updateFAQ, deleteFAQ, searchFAQs };