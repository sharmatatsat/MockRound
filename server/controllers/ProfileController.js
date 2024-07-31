// controllers/profileController.js
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile'); // Make sure this is the correct path for your model

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Path to the uploads directory
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

// Save student data
exports.saveStudentData = async (req, res) => {
    const { name, phone, email, aadhar, marks, entranceExam, percentile, caste } = req.body;
    const files = req.files || {};

    try {
        // Create or update a student entry
        let profile = await Profile.findOne({ email });

        if (!profile) {
            profile = new Profile();
        }

        // Update file paths if files are uploaded
        if (files['tenthMarksheet']) {
            profile.tenthMarksheet = files['tenthMarksheet'][0].path;
        }
        if (files['twelfthMarksheet']) {
            profile.twelfthMarksheet = files['twelfthMarksheet'][0].path;
        }
        if (files['entranceExamMarksheet']) {
            profile.entranceExamMarksheet = files['entranceExamMarksheet'][0].path;
        }

        // Update other fields
        profile.name = name;
        profile.phone = phone;
        profile.email = email;
        profile.aadhar = aadhar;
        profile.marks = marks;
        profile.entranceExam = entranceExam;
        profile.percentile = percentile;
        profile.caste = caste;

        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
