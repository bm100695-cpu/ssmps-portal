const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getMarks, saveMarks } = require('../controllers/markController');

const router = express.Router();

router.route('/')
    .get(protect, getMarks)
    .post(protect, saveMarks);

module.exports = router;
