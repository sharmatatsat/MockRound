// routes/colleges.js
const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Route to get colleges based on student profile
router.post('/find', async (req, res) => {
    const { percentile, caste } = req.body;

    try {
        // Find colleges where the student's percentile meets or exceeds the cutoff for the given caste
        const colleges = await College.find({
            [`casteCategoryCutOff.${caste}`]: { $lte: percentile }
        });

        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching colleges', error });
    }
});

module.exports = router;
