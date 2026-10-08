const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected for seeding');

        // Check if admin already exists
        const adminExists = await User.findOne({ mobile: '9999999999' });

        if (adminExists) {
            console.log('Admin already exists. Skipping seed.');
            process.exit();
        }

        const adminUser = new User({
            role: 'Admin',
            fullName: 'Super Admin',
            mobile: '9999999999',
            email: 'admin@smartschool.com',
            password: 'password123', // Will be hashed by pre-save hook
            status: 'Active'
        });

        await adminUser.save();
        console.log('✅ Admin user created successfully!');
        console.log('Mobile: 9999999999');
        console.log('Password: password123');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
