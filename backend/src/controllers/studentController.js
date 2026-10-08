const StudentRecord = require('../models/StudentRecord');

// @desc    Get all student records
// @route   GET /api/students
// @access  Private/Admin/Principal
exports.getStudents = async (req, res) => {
    try {
        const students = await StudentRecord.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new student record
// @route   POST /api/students
// @access  Private/Admin
exports.createStudent = async (req, res) => {
    try {
        const { admissionNumber, rollNumber, studentName, class: studentClass, section } = req.body;

        const recordExists = await StudentRecord.findOne({
            $or: [{ admissionNumber }, { rollNumber: rollNumber, class: studentClass, section }]
        });

        if (recordExists) {
            return res.status(400).json({ message: 'A student with this Admission Number or Roll Number already exists in this class' });
        }

        const student = await StudentRecord.create({
            admissionNumber,
            rollNumber,
            studentName,
            class: studentClass,
            section
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete student record
// @route   DELETE /api/students/:id
// @access  Private/Admin
exports.deleteStudent = async (req, res) => {
    try {
        const student = await StudentRecord.findById(req.params.id);
        
        if (student) {
            if (student.isRegistered) {
                 return res.status(400).json({ message: 'Cannot delete record: Student has already registered an online account. Please deactivate their user account first.' });
            }
            await student.deleteOne();
            res.json({ message: 'Student record removed successfully' });
        } else {
            res.status(404).json({ message: 'Student record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
