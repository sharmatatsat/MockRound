const College = require('../models/College');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
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
            approvedBy
        } = req.body;
    
        try {
            const college = await College.findOne({ userId: req.user._id });
    
            if (!college) {
                return res.status(404).json({ message: 'College not found' });
            }
    
            college.collegeName = collegeName || college.collegeName;
            college.state = state || college.state;
            college.city = city || college.city;
            college.address = address || college.address;
            college.collegeCode = collegeCode || college.collegeCode;
            college.branch = branch || college.branch;
            college.course = course || college.course;
            college.coursesAvailable = coursesAvailable || college.coursesAvailable;
            college.courseCutoffs = courseCutoffs || college.courseCutoffs;
            college.minStudentCriteria = minStudentCriteria || college.minStudentCriteria;
            college.maxCriteria = maxCriteria || college.maxCriteria;
            college.spotRoundDates = spotRoundDates || college.spotRoundDates;
            college.approvedBy = approvedBy || college.approvedBy;
    
            // Save the updated college profile
            await college.save();
    
            res.status(200).json(college);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    




exports.addCollege = async (req, res) => {
    console.log('Authenticated User:', req.user);

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
};

exports.getColleges = async (req, res) => {
    try {
        const colleges = await College.find(req.query);
        res.status(200).json(colleges);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.findColleges = async (req, res) => {
    const { percentile } = req.body;

    if (isNaN(parseFloat(percentile))) {
        return res.status(400).json({ message: 'Invalid percentile' });
    }

    const percentileNumber = parseFloat(percentile);

    try {
        
        const colleges = await College.find({
            courseCutoffs: { $lte: percentileNumber }
        });

        if (colleges.length === 0) {
            return res.status(404).json({ message: 'No colleges found' });
        }

        res.json(colleges);
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Error fetching colleges', error });
    }
};
