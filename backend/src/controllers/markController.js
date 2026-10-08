const Mark = require('../models/Mark');

exports.getMarks = async (req, res) => {
    try {
        const marks = await Mark.find().sort({ createdAt: -1 });
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveMarks = async (req, res) => {
    try {
        const { className, subject, examType, marksData } = req.body;
        
        // Save multiple marks
        const newMarks = marksData.map(data => ({
            className,
            subject,
            examType,
            studentRoll: data.roll,
            studentName: data.name,
            marksObtained: data.marks,
            remarks: data.remarks,
            createdBy: req.user._id
        }));

        await Mark.insertMany(newMarks);
        res.status(201).json({ message: 'Marks saved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
