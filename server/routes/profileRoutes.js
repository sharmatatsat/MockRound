const express = require('express');
const router = express.Router();
const { handleFileUploads, saveStudentData, checkProfileCompletion , getStudentData,updateStudentInfo} = require('../controllers/ProfileController');
const {protect} = require('../middleware/authMiddleware');
const {filterCollegesByStateAndCity} = require('../controllers/collegeController')

router.post('/update', handleFileUploads, saveStudentData);
router.get('/check-completion', checkProfileCompletion);
router.get('/student-data', getStudentData);
router.put('/save',protect,updateStudentInfo);
router.get('/filtercolleges', filterCollegesByStateAndCity);


module.exports = router;

