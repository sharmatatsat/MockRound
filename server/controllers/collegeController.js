const College = require('../models/College');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    




// exports.addCollege = async (req, res) => {
//     console.log('Authenticated User:', req.user);

//     const {
//         collegeName,
//         state,
//         city,
//         address,
//         collegeCode,
//         branch,
//         course,
//         coursesAvailable,
//         courseCutoffs,
//         minStudentCriteria,
//         maxCriteria,
//         spotRoundDates,
//         casteCategoryCutOff,
//         approvedBy
//     } = req.body;

//     if (!req.user) {
//         return res.status(401).json({ message: 'User not authenticated' });
//     }

//     try {
//         const newCollege = new College({
//             collegeName,
//             state,
//             city,
//             address,
//             collegeCode,
//             branch,
//             course,
//             coursesAvailable,
//             courseCutoffs,
//             minStudentCriteria,
//             maxCriteria,
//             spotRoundDates,
//             casteCategoryCutOff,
//             approvedBy,
//             userId: req.user._id
//         });

//         await newCollege.save();
//         res.status(201).json(newCollege);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

exports.addCollege = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey'); // Use the same secret as when signing the token
        const userId = decoded.id; // Assuming the id is stored in the token payload

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

        // Update using userId instead of college field
        let college = await College.findOneAndUpdate(
            { userId: userId }, // Use userId to find the correct document
            {
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
                approvedBy,
            },
            { new: true, upsert: true }
        );

        // Optionally update the profile status
        await College.findByIdAndUpdate(college._id, { profileCompleted: true });

        res.json({ message: 'College Profile saved successfully!' });
    } catch (error) {
        console.error('Error saving profile:', error);
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
