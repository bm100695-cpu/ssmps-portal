const Fee = require('../models/Fee');
const User = require('../models/User');

// @desc    Get all fees (Admin)
// @route   GET /api/fees
// @access  Private/Admin
exports.getAllFees = async (req, res) => {
    try {
        const fees = await Fee.find().populate('student', 'fullName mobile').sort({ createdAt: -1 });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a fee record
// @route   POST /api/fees
// @access  Private/Admin
exports.createFee = async (req, res) => {
    try {
        const { student, feeType, amount, dueDate } = req.body;

        const fee = await Fee.create({
            student,
            feeType,
            amount,
            dueDate
        });

        res.status(201).json(fee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get fees for logged in parent/student
// @route   GET /api/fees/myfees
// @access  Private
exports.getMyFees = async (req, res) => {
    try {
        // If parent, ideally we'd fetch fees for linked children. 
        // For simplicity in this demo, if it's a student we fetch their fees.
        let queryId = req.user._id; 
        
        const fees = await Fee.find({ student: queryId }).sort({ dueDate: 1 });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark fee as paid
// @route   PUT /api/fees/:id/pay
// @access  Private/Admin
exports.markFeePaid = async (req, res) => {
    try {
        const fee = await Fee.findById(req.params.id);
        if (fee) {
            fee.status = 'Paid';
            fee.paymentDate = Date.now();
            fee.transactionId = `TXN${Math.floor(Math.random() * 1000000000)}`;
            
            await fee.save();
            res.json(fee);
        } else {
            res.status(404).json({ message: 'Fee record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
