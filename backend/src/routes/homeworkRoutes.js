const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getHomeworks, createHomework } = require('../controllers/homeworkController');

const router = express.Router();

router.route('/')
    .get(protect, getHomeworks)
    .post(protect, createHomework);

module.exports = router;
