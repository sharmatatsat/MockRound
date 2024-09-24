const express = require('express');
const router = express.Router();
const { handleFileUploads, saveStudentData, checkProfileCompletion , getStudentData,updateStudentInfo} = require('../controllers/ProfileController');
const {protect} = require('../middleware/authMiddleware');
// Route for saving/updating student profile
router.post('/update', handleFileUploads, saveStudentData);

// Route to check if the profile is completed and redirect accordingly
router.get('/check-completion', checkProfileCompletion);
router.get('/student-data', getStudentData);
// router.get('/verifyStatus/:studentId', getVerifyInfo);
router.put('/save',protect,updateStudentInfo);


module.exports = router;

