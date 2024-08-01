// controllers/ProfileController.js
const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware for handling file uploads
exports.handleFileUploads = upload.fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'entranceExamMarksheet', maxCount: 1 }
]);

// Function to save student data
exports.saveStudentData = async (req, res) => {
    const { name, phone, aadhar, marks, entranceExam, percentile, caste } = req.body;
    const uploadedFiles = req.files || {};

    try {
        let profile = await Profile.findOne({ email: req.body.email });

        if (!profile) {
            profile = new Profile();
        }

        profile.name = name;
        profile.phone = phone;
        profile.aadhar = aadhar;
        profile.marks = marks;
        profile.entranceExam = entranceExam;
        profile.percentile = percentile;
        profile.caste = caste;

        // Update file fields
        profile.tenthMarksheet = uploadedFiles['tenthMarksheet'] ? uploadedFiles['tenthMarksheet'][0].filename : profile.tenthMarksheet;
        profile.twelfthMarksheet = uploadedFiles['twelfthMarksheet'] ? uploadedFiles['twelfthMarksheet'][0].filename : profile.twelfthMarksheet;
        profile.entranceExamMarksheet = uploadedFiles['entranceExamMarksheet'] ? uploadedFiles['entranceExamMarksheet'][0].filename : profile.entranceExamMarksheet;

        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
