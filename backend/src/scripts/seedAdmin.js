const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school_management');
        console.log('MongoDB Connected...');

        const adminExists = await User.findOne({ email: 'admin@school.com' });

        if (adminExists) {
            console.log('Admin user already exists in the database.');
            process.exit(0);
        }

        const adminUser = await User.create({
            fullName: 'System Administrator',
            email: 'admin@school.com',
            password: 'password123',
            role: 'Admin',
            mobile: '1234567890'
        });

        console.log('✅ Admin user created successfully!');
        console.log('-----------------------------------');
        console.log('Email: admin@school.com');
        console.log('Password: password123');
        console.log('-----------------------------------');
        console.log('You can now log in to the portal.');

        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
