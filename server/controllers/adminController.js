const College = require('../models/College'); // Adjust the path as needed
const Student = require('../models/Student'); // Adjust the path as needed

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
        const students = await Student.find(); // Fetch all students from the database
        res.status(200).json(students); // Respond with the list of students
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

// Controller to get student details including uploaded files
exports.getStudentFiles = async (req, res) => {
    try {
        const studentId = req.params.id; // Get student ID from request parameters
        const student = await Student.findById(studentId); // Find student by ID
        if (!student) {
            return res.status(404).json({ message: 'Student not found' }); // Handle case where student is not found
        }
        res.status(200).json(student); // Respond with student details including uploaded files
    } catch (error) {
        console.error('Error fetching student files:', error);
        res.status(500).json({ message: 'Error fetching student files', error });
    }
};
