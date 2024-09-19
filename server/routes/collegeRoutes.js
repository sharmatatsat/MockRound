const express = require('express');
const router = express.Router();
const College = require('../models/College');
const {addCollege,getColleges, findColleges} = require('../controllers/collegeController'); 
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addCollege);
router.get('/entries', getColleges)
router.get('/find', findColleges)
    

// router.put('/profile', protect, updateProfile);

module.exports = router;
