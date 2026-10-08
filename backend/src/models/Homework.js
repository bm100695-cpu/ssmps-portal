const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    class: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Grading', 'Completed'],
        default: 'Active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Homework', homeworkSchema);
