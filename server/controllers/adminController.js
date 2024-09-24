const Profile = require('../models/Profile');
const Student = require('../models/Student');
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

exports.deleteStudentProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProfile = await Profile.findByIdAndDelete(id);
      
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

exports.updateStudentProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
// Controller to get all student profiles with specific attributes
exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({})
            .populate('student', 'name email')  // Use 'student' instead of 'studentId'
            .select('course percentile entranceExamMarksheet');

        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);  // Log the full error object
        res.status(500).json({ message: 'Error fetching profiles', error: error.message });
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
// adminController.js
exports.updateCollege = async (req, res) => {
    const collegeId = req.params.id;
    console.log('College ID:', collegeId); // Debug log
  
    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: 'Invalid college ID' });
    }
  
    try {
      const updatedCollege = await College.findByIdAndUpdate(collegeId, req.body, { new: true });
      if (!updatedCollege) {
        return res.status(404).json({ message: 'College not found' });
      }
  
      res.json(updatedCollege);
    } catch (error) {
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


exports.getCollegesWithAttributes = async (req, res) => {
    try {
        // Fetch colleges with specific attributes
        const colleges = await College.find({}, 'collegeName state city coursesAvailable courseCutoffs maxCriteria');
        res.status(200).json(colleges);
    } catch (error) {
        console.error('Error fetching colleges with specific attributes:', error);
        res.status(500).json({ message: 'Error fetching colleges with specific attributes', error });
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


exports.verifyStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId; // Ensure this matches your route param
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { verified: true },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student verified successfully', student: updatedStudent });
    } catch (error) {
        console.error('Error verifying student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};