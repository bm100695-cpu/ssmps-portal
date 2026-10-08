const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getStudents, createStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin', 'Principal'));

router.route('/')
    .get(getStudents)
    .post(authorize('Admin'), createStudent);

router.route('/:id')
    .delete(authorize('Admin'), deleteStudent);

module.exports = router;
