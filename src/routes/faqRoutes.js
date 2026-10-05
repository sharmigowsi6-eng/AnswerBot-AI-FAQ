const express = require('express');
const router = express.Router();
const { createFAQ, getAllFAQs, getFAQById, updateFAQ, deleteFAQ, searchFAQs } = require('../controllers/faqController');
const { protect } = require('../middleware/authMiddleware');
const { validateFAQ } = require('../middleware/validationMiddleware');

router.get('/search', searchFAQs);
router.get('/', getAllFAQs);
router.get('/:id', getFAQById);

router.post('/', protect, validateFAQ, createFAQ);
router.put('/:id', protect, updateFAQ);
router.delete('/:id', protect, deleteFAQ);

module.exports = router;