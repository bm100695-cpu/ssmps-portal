const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String, // e.g., "Mathematics"
        required: true
    },
    subjectCode: {
        type: String, // e.g., "MATH101"
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Theory', 'Practical'],
        default: 'Theory'
    }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
