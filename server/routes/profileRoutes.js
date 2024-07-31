// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { handleFileUploads, saveStudentData } = require('../controllers/ProfileController');

// Route to handle file uploads and saving student data
router.post('/save', handleFileUploads, saveStudentData);

module.exports = router;
