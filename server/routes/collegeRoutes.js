const express = require('express');
const router = express.Router();
const College = require('../models/College');
const { protect } = require('../middleware/authMiddleware'); 

router.post('/add', protect, async (req, res) => {
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
        // casteCategoryCutOff,
        approvedBy
    } = req.body;

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
            // casteCategoryCutOff,
            approvedBy,
            userId: req.user._id 
        });

        await newCollege.save();
        res.status(201).json(newCollege);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all college entries
router.get('/entries', async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
