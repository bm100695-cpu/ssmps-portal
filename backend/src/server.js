const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();
const app = express();

// Middleware
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/academic', require('./routes/academicRoutes'));
app.use('/api/transport', require('./routes/transportRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/homework', require('./routes/homeworkRoutes')); // Duplicate route hata diya gaya hai
app.use('/api/marks', require('./routes/markRoutes'));

// Basic route
app.get('/', (req, res) => {
    res.send('Smart School API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});