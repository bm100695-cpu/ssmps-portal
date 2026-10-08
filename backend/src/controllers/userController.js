const User = require('../models/User');

// @desc    Get all users (filtered by role optionally)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};
        if (role) {
            query.role = role;
        }
        
        const users = await User.find(query).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new user (Staff, Teacher, Driver) by Admin
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, mobile, password, role } = req.body;

        if (role === 'Student' || role === 'Parent') {
             return res.status(400).json({ message: 'Students and Parents use the self-registration portal.' });
        }

        const userExists = await User.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({ message: 'User with this mobile already exists' });
        }

        const user = await User.create({
            fullName,
            email,
            mobile,
            password,
            role
        });

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (user) {
            if(user.role === 'Admin') {
                return res.status(400).json({ message: 'Cannot delete an Admin user' });
            }
            await user.deleteOne();
            res.json({ message: 'User removed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (Any logged in user)
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (user) {
            user.fullName = req.body.fullName || user.fullName;
            user.email = req.body.email || user.email;
            user.mobile = req.body.mobile || user.mobile;
            
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                mobile: updatedUser.mobile,
                role: updatedUser.role,
                token: req.headers.authorization.split(' ')[1] // Keep existing token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
