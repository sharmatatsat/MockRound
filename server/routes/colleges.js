const express = require('express');
const router = express.Router();
const College = require('../models/College');

router.post('/find', async (req, res) => {
    const { percentile, caste } = req.body;

    
    if (isNaN(parseFloat(percentile)) || !caste) {
        return res.status(400).json({ message: 'Invalid percentile or caste' });
    }

   
    const percentileNumber = parseFloat(percentile);

    try {
        
        const colleges = await College.find({
            [`casteCategoryCutOff.${caste}`]: { $lte: percentileNumber }
        });

        if (colleges.length === 0) {
            return res.status(404).json({ message: 'No colleges found' });
        }

        res.json(colleges);
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Error fetching colleges', error });
    }
});

module.exports = router;
