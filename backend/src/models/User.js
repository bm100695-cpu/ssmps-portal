const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['Admin', 'Principal', 'Teacher', 'Driver', 'Parent', 'Student'],
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Pending'],
        default: 'Active'
    },
    // Reference fields based on role
    studentRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    parentRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    },
    staffRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    driverRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
