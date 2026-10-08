const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getNotices, createNotice } = require('../controllers/noticeController');

const router = express.Router();

router.route('/')
    .get(protect, getNotices)
    .post(protect, createNotice);

module.exports = router;
