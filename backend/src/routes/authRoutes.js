const express = require('express');
const { registerStudent, registerParent, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register/student', registerStudent);
router.post('/register/parent', registerParent);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
