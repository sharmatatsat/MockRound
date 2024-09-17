const express = require('express');
const router = express.Router();
const College = require('../models/College');
const { updateProfile } = require('../controllers/collegeController'); 
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, async (req, res) => {
    console.log(req.user); // Log user to see if it's populated

    const {
        collegeName,
        state,
        city,
        address,
        collegeCode,
        branch,
        course,
        coursesAvailable,
        courseCutoffs,
        minStudentCriteria,
        maxCriteria,
        spotRoundDates,
        casteCategoryCutOff,
        approvedBy
    } = req.body;

    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        const newCollege = new College({
            collegeName,
            state,
            city,
            address,
            collegeCode,
            branch,
            course,
            coursesAvailable,
            courseCutoffs,
            minStudentCriteria,
            maxCriteria,
            spotRoundDates,
            casteCategoryCutOff,
            approvedBy,
            userId: req.user._id
        });

        await newCollege.save();
        res.status(201).json(newCollege);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/profile', protect, updateProfile);

router.get('/entries', async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
