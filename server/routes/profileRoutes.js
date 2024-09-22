const express = require('express');
const router = express.Router();
const { handleFileUploads, saveStudentData, checkProfileCompletion , getStudentData,verifyStudent} = require('../controllers/ProfileController');

// Route for saving/updating student profile
router.post('/update', handleFileUploads, saveStudentData);

// Route to check if the profile is completed and redirect accordingly
router.get('/check-completion', checkProfileCompletion);
router.get('/student-data', getStudentData);
// router.put('/verify/:studentId', verifyStudent);

module.exports = router;
