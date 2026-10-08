const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
    className: { type: String, required: true },
    subject: { type: String, required: true },
    examType: { type: String, required: true },
    studentRoll: { type: String, required: true },
    studentName: { type: String, required: true },
    marksObtained: { type: Number, required: true },
    remarks: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Mark', markSchema);
