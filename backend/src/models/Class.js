const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {
        type: String, // e.g., "10" or "X"
        required: true,
    },
    sections: [{
        type: String, // e.g., "A", "B"
    }],
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

// Ensure unique class names
classSchema.index({ className: 1 }, { unique: true });

module.exports = mongoose.model('Class', classSchema);
