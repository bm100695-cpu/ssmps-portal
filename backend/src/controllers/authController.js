const User = require('../models/User');
const StudentRecord = require('../models/StudentRecord');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new student
// @route   POST /api/auth/register/student
// @access  Public
exports.registerStudent = async (req, res) => {
    try {
        const { fullName, mobile, email, password, admissionNumber, rollNumber } = req.body;

        const userExists = await User.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({ message: 'User with this mobile number already exists' });
        }

        if (!admissionNumber || !rollNumber) {
             return res.status(400).json({ message: 'Admission number and Roll number required' });
        }

        // Verify against school records
        const record = await StudentRecord.findOne({ admissionNumber, rollNumber });
        if (!record) {
            return res.status(404).json({ message: 'Invalid Admission Number or Roll Number. Record not found.' });
        }
        if (record.isRegistered) {
            return res.status(400).json({ message: 'A student account is already registered with this admission number.' });
        }

        const user = await User.create({
            role: 'Student',
            fullName,
            mobile,
            email,
            password
        });

        if (user) {
            record.isRegistered = true;
            await record.save();

            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                mobile: user.mobile,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new parent
// @route   POST /api/auth/register/parent
// @access  Public
exports.registerParent = async (req, res) => {
    try {
        const { fullName, mobile, email, password, studentAdmissionNumber, studentRollNumber } = req.body;

        const userExists = await User.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({ message: 'User with this mobile number already exists' });
        }

        if (!studentAdmissionNumber || !studentRollNumber) {
            return res.status(400).json({ message: 'Child Admission Number and Roll Number required' });
        }

        // Verify child against school records
        const record = await StudentRecord.findOne({ admissionNumber: studentAdmissionNumber, rollNumber: studentRollNumber });
        if (!record) {
            return res.status(404).json({ message: 'Invalid Child Admission Number or Roll Number. Record not found.' });
        }

        const user = await User.create({
            role: 'Parent',
            fullName,
            mobile,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                mobile: user.mobile,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        console.log("LOGIN MOBILE:", mobile);
        console.log("LOGIN PASSWORD:", password);

        const user = await User.findOne({ mobile });

        console.log("USER FOUND:", user ? user.mobile : "NO USER");

        if (user) {
            console.log("PASSWORD MATCH:", await user.matchPassword(password));
        }

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.json({
                _id: user._id,
                fullName: user.fullName,
                mobile: user.mobile,
                role: user.role,
                token
            });
        } else {
            res.status(401).json({
                message: 'Invalid mobile number or password'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
