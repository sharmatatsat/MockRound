const College = require('../models/College');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    const { name, phone, aadhar, percentile, branch, course, coursesAvailable,courseCutoffs,minStudentCriteria, maxCriteria,spotRoundDates,approvedBy} = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile = {
            name,
            phone,
            aadhar,
            percentile,
            branch,
            course,
            coursesAvailable,
            courseCutoffs,
            minStudentCriteria,
            maxCriteria,
            spotRoundDates,
            approvedBy,
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            isComplete: true
        };

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




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
