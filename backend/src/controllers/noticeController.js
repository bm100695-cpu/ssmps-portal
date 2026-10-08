const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Private
exports.getNotices = async (req, res) => {
    try {
        const role = req.user.role;
        let query = {};
        
        if (role === 'Teacher') {
            query.audience = { $in: ['All', 'Teachers'] };
        } else if (role === 'Student') {
            query.audience = { $in: ['All', 'Students'] };
        } else if (role === 'Parent') {
            query.audience = { $in: ['All', 'Parents'] };
        }

        const notices = await Notice.find(query).sort({ date: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new notice
// @route   POST /api/notices
// @access  Private
exports.createNotice = async (req, res) => {
    try {
        const { title, type, content, date, audience } = req.body;

        const notice = await Notice.create({
            title,
            type,
            content,
            audience: audience || 'All',
            date: date || Date.now(),
            createdBy: req.user._id
        });

        res.status(201).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
