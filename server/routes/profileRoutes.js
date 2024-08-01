// profileRoutes.js
const express = require('express');
const router = express.Router();
const { handleFileUploads, saveStudentData } = require('../controllers/ProfileController');

// Route for handling file uploads and saving student data
router.post('/update', handleFileUploads, saveStudentData);

module.exports = router;
