const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    feeType: {
        type: String, // Tuition, Transport, Library, etc.
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date
    },
    transactionId: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
