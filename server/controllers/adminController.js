const College = require('../models/College');
const Profile = require('../models/Profile'); 

// Controller to get all colleges
exports.getColleges = async (req, res) => {
    try {
        const colleges = await College.find(); 
        res.status(200).json(colleges); 
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Error fetching colleges', error });
    }
};

// Controller to get all student profiles
exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find(); 
        res.status(200).json(profiles); 
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Error fetching profiles', error });
    }
};

// Controller to get student details including uploaded files
exports.getStudentFiles = async (req, res) => {
    try {
        const studentId = req.params.id; 
        const student = await Profile.findById(studentId); 
        if (!student) {
            return res.status(404).json({ message: 'Student not found' }); 
        }
        res.status(200).json(student); 
    } catch (error) {
        console.error('Error fetching student files:', error);
        res.status(500).json({ message: 'Error fetching student files', error });
    }
};

exports.deleteCollege = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await College.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ message: 'College not found' });

        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
