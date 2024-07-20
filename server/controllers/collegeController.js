const College = require('../models/College');

exports.addCollege = async (req, res) => {
    const collegeData = req.body;

    try {
        const college = await College.create(collegeData);
        res.status(201).json(college);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getColleges = async (req, res) => {
    try {
        const colleges = await College.find(req.query);
        res.status(200).json(colleges);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
