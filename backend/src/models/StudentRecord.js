const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema({
    admissionNumber: {
        type: String,
        required: true,
        unique: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    isRegistered: {
        type: Boolean,
        default: false // Set to true when the student creates their online account
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('StudentRecord', studentRecordSchema);
