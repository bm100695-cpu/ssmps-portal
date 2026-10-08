const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { 
    getClasses, createClass, deleteClass, 
    getSubjects, createSubject, deleteSubject 
} = require('../controllers/academicController');

const router = express.Router();

router.use(protect);

// Classes Routes
router.route('/classes')
    .get(getClasses)
    .post(authorize('Admin', 'Principal'), createClass);

router.route('/classes/:id')
    .delete(authorize('Admin', 'Principal'), deleteClass);

// Subjects Routes
router.route('/subjects')
    .get(getSubjects)
    .post(authorize('Admin', 'Principal'), createSubject);

router.route('/subjects/:id')
    .delete(authorize('Admin', 'Principal'), deleteSubject);

module.exports = router;
