const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAllUsers = async () => {
    try {
           await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Dummy data for all roles
        const users = [
            {
                fullName: 'John Principal',
                email: 'principal@school.com',
                password: 'password123',
                role: 'Principal',
                mobile: '1000000001'
            },
            {
                fullName: 'Sarah Teacher',
                email: 'teacher@school.com',
                password: 'password123',
                role: 'Teacher',
                mobile: '1000000002'
            },
            {
                fullName: 'Mike Driver',
                email: 'driver@school.com',
                password: 'password123',
                role: 'Driver',
                mobile: '1000000003'
            },
            {
                fullName: 'Linda Parent',
                email: 'parent@school.com',
                password: 'password123',
                role: 'Parent',
                mobile: '1000000004'
            },
            {
                fullName: 'Tommy Student',
                email: 'student@school.com',
                password: 'password123',
                role: 'Student',
                mobile: '1000000005'
            }
        ];

        for (let user of users) {
            const exists = await User.findOne({ mobile: user.mobile });
            if (!exists) {
                await User.create(user);
                console.log(`Created ${user.role}: ${user.fullName}`);
            } else {
                console.log(`${user.role} already exists.`);
            }
        }

        console.log('✅ All dummy users created successfully!');
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAllUsers();
