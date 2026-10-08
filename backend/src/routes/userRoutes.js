const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getUsers, createUser, deleteUser, updateProfile } = require('../controllers/userController');

const router = express.Router();

// ANY logged in user can update their own profile
router.put('/profile', protect, updateProfile);

// Admin-only routes
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .delete(deleteUser);

module.exports = router;
