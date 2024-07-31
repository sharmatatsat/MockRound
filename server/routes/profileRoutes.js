const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');

// Middleware for handling file uploads
router.put('/update', ProfileController.handleFileUploads, ProfileController.updateStudentProfile);

module.exports = router;
