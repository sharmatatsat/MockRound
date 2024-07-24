const express = require('express');
const router = express.Router();
const College = require('../models/College');


router.post('/find', async (req, res) => {
    const { percentile, caste } = req.body;

    console.log('Percentile:', percentile);
    console.log('Caste:', caste);

    // Ensure percentile is a number
    const percentileNumber = parseFloat(percentile);

    try {
        const colleges = await College.find({
            [`casteCategoryCutOff.${caste}`]: { $lte: percentileNumber }
        });

        console.log('Colleges:', colleges);
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching colleges', error });
    }
});


module.exports = router;
