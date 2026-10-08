const Class = require('../models/Class');
const Subject = require('../models/Subject');

// --- CLASSES ---

// @desc    Get all classes
// @route   GET /api/academic/classes
// @access  Private
exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('classTeacher', 'fullName email');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a class
// @route   POST /api/academic/classes
// @access  Private/Admin
exports.createClass = async (req, res) => {
    try {
        const { className, sections, classTeacher } = req.body;
        
        const classExists = await Class.findOne({ className });
        if (classExists) {
            return res.status(400).json({ message: 'Class already exists' });
        }

        // Sections usually sent as comma-separated or array. Ensure array.
        let formattedSections = [];
        if (Array.isArray(sections)) {
            formattedSections = sections;
        } else if (typeof sections === 'string') {
            formattedSections = sections.split(',').map(s => s.trim());
        }

        const newClass = await Class.create({
            className,
            sections: formattedSections,
            classTeacher: classTeacher || null
        });

        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a class
// @route   DELETE /api/academic/classes/:id
// @access  Private/Admin
exports.deleteClass = async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);
        if (classItem) {
            await classItem.deleteOne();
            res.json({ message: 'Class removed' });
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- SUBJECTS ---

// @desc    Get all subjects
// @route   GET /api/academic/subjects
// @access  Private
exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a subject
// @route   POST /api/academic/subjects
// @access  Private/Admin
exports.createSubject = async (req, res) => {
    try {
        const { subjectName, subjectCode, type } = req.body;

        const subjectExists = await Subject.findOne({ subjectCode });
        if (subjectExists) {
            return res.status(400).json({ message: 'Subject code already exists' });
        }

        const subject = await Subject.create({
            subjectName,
            subjectCode,
            type
        });

        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a subject
// @route   DELETE /api/academic/subjects/:id
// @access  Private/Admin
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (subject) {
            await subject.deleteOne();
            res.json({ message: 'Subject removed' });
        } else {
            res.status(404).json({ message: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
