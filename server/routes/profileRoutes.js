const express = require('express');
const router = express.Router();
const { handleFileUploads, saveStudentData, checkProfileCompletion , getStudentData,getVerifyInfo} = require('../controllers/ProfileController');

// Route for saving/updating student profile
router.post('/update', handleFileUploads, saveStudentData);

// Route to check if the profile is completed and redirect accordingly
router.get('/check-completion', checkProfileCompletion);
router.get('/student-data', getStudentData);
router.get('/verifyStatus/:studentId', getVerifyInfo);


module.exports = router;
