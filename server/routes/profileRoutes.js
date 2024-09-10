// profileRoutes.js
const express = require('express');
const router = express.Router();
const { handleFileUploads, saveStudentData } = require('../controllers/ProfileController');
const profileController = require('../controllers/ProfileController');


router.post('/update', handleFileUploads, saveStudentData);
router.post('/verify/:studentId', profileController.verifyStudentProfile);
module.exports = router;
