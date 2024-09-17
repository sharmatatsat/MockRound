const Profile = require('../models/Profile');
const College = require('../models/College');
const path = require('path');
const fs = require('fs');

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

// Controller to get all student profiles with specific attributes
exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({}, 'name email course percentile entranceExamMarksheet');
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
        const student = await Profile.findById(studentId, 'name email course percentile entranceExamMarksheet');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Fetch the file URL
        const filePath = path.join(__dirname, '../uploads', student.entranceExamMarksheet); // Adjust the path as needed
        if (fs.existsSync(filePath)) {
            student.entranceExamMarksheet = filePath; // Send the file path or URL as needed
        } else {
            student.entranceExamMarksheet = null; // Handle file not found scenario
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student files:', error);
        res.status(500).json({ message: 'Error fetching student files', error });
    }
};

// Controller to delete a college
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

// Controller to add a new college
exports.addCollege = async (req, res) => {
    try {
        const newCollege = new College(req.body);
        const savedCollege = await newCollege.save();
        res.status(201).json(savedCollege);
    } catch (error) {
        console.error('Error adding college:', error);
        res.status(500).json({ message: 'Error adding college', error });
    }
};

// Controller to update a college
exports.updateCollege = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCollege = await College.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCollege) return res.status(404).json({ message: 'College not found' });
        res.status(200).json(updatedCollege);
    } catch (error) {
        console.error('Error updating college:', error);
        res.status(500).json({ message: 'Error updating college', error });
    }
};

// Controller to get a single student's details by ID
exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Profile.findById(id, 'name email course percentile entranceExamMarksheet');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ message: 'Error fetching student by ID', error });
    }
};
