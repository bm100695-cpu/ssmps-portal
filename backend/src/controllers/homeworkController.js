const Homework = require('../models/Homework');

// @desc    Get all homeworks
// @route   GET /api/homework
// @access  Private
exports.getHomeworks = async (req, res) => {
    try {
        const homeworks = await Homework.find().sort({ createdAt: -1 });
        res.json(homeworks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new homework
// @route   POST /api/homework
// @access  Private
exports.createHomework = async (req, res) => {
    try {
        const { title, className, subject, dueDate, fileName } = req.body;

        const homework = await Homework.create({
            title,
            class: className,
            subject,
            dueDate,
            fileName,
            createdBy: req.user._id
        });

        res.status(201).json(homework);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
