const College = require('../models/College');
const Profile = require('../models/Profile'); // Changed from Student to Profile

// Controller to get all colleges
exports.getColleges = async (req, res) => {
    try {
        const colleges = await College.find(); // Fetch all colleges from the database
        res.status(200).json(colleges); // Respond with the list of colleges
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Error fetching colleges', error });
    }
};

// Controller to get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Profile.find(); // Fetch all student profiles from the database
        res.status(200).json(students); // Respond with the list of student profiles
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

// Controller to get student details including uploaded files
exports.getStudentFiles = async (req, res) => {
    try {
        const studentId = req.params.id; // Get student ID from request parameters
        const student = await Profile.findById(studentId); // Find student profile by ID
        if (!student) {
            return res.status(404).json({ message: 'Student not found' }); // Handle case where student is not found
        }
        res.status(200).json(student); // Respond with student profile including uploaded files
    } catch (error) {
        console.error('Error fetching student files:', error);
        res.status(500).json({ message: 'Error fetching student files', error });
    }
};
