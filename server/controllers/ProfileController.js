const multer = require('multer');
const path = require('path');
const Student = require('../models/Profile');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));  // Use __dirname to get the path to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'entranceExamMarksheet', maxCount: 1 }
]);

// Middleware for handling file uploads
exports.handleFileUploads = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload error' });
        }
        next();
    });
};

// Update student profile
exports.updateStudentProfile = async (req, res) => {
    const { name, phone, email, aadhar, marks, entranceExam, percentile, caste } = req.body;
    const files = req.files || {};

    try {
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Update file paths if files are uploaded
        if (files['tenthMarksheet']) {
            student.tenthMarksheet = files['tenthMarksheet'][0].path;
        }
        if (files['twelfthMarksheet']) {
            student.twelfthMarksheet = files['twelfthMarksheet'][0].path;
        }
        if (files['entranceExamMarksheet']) {
            student.entranceExamMarksheet = files['entranceExamMarksheet'][0].path;
        }

        // Update other fields
        student.name = name;
        student.phone = phone;
        student.aadhar = aadhar;
        student.marks = marks;
        student.entranceExam = entranceExam;
        student.percentile = percentile;
        student.caste = caste;

        await student.save();
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
