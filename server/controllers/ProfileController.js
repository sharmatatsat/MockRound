const Profile = require('../models/Profile');
const Student = require('../models/Student');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware for handling file uploads
exports.handleFileUploads = upload.fields([
  { name: 'tenthMarksheet', maxCount: 1 },
  { name: 'twelfthMarksheet', maxCount: 1 },
  { name: 'entranceExamMarksheet', maxCount: 1 }
]);

// Function to save student data
exports.saveStudentData = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');
      const studentId = decoded.id;
  
      const { phone, aadhar, marks = {}, entranceExam, percentile, branch, course } = req.body;
      const uploadedFiles = req.files || {};
  
      let profile = await Profile.findOneAndUpdate(
        { student: studentId },
        {
          phone,
          aadhar,
          marks: {
            tenth: marks.tenth || null,
            twelfth: marks.twelfth || null,
          },
          entranceExam,
          percentile,
          branch,
          course,
          tenthMarksheet: uploadedFiles['tenthMarksheet'] ? uploadedFiles['tenthMarksheet'][0].filename : null,
          twelfthMarksheet: uploadedFiles['twelfthMarksheet'] ? uploadedFiles['twelfthMarksheet'][0].filename : null,
          entranceExamMarksheet: uploadedFiles['entranceExamMarksheet'] ? uploadedFiles['entranceExamMarksheet'][0].filename : null,
        },
        { new: true, upsert: true }
      );
  
      await Student.findByIdAndUpdate(studentId, { profileCompleted: true });
  
      res.json({ redirect: '/student/dashboard' }); // JSON response for redirection
    } catch (error) {
      console.error('Error saving profile:', error);
      res.status(400).json({ error: error.message });
    }
  };
// Redirect based on profile completion
exports.checkProfileCompletion = async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' }); // JSON response
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' }); // JSON response
    }

    if (student.profileCompleted) {
      res.json({ redirect: '/student/dashboard' }); // JSON response for redirection
    } else {
      res.json({ redirect: '/student/profile' }); // JSON response for redirection
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' }); // JSON response
  }
};


exports.getStudentData = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');
      const studentId = decoded.id;
  
      const student = await Student.findById(studentId);
      const profile = await Profile.findOne({ student: studentId });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({
        student: {
          name: student.name,
          email: student.email,
          profileCompleted: student.profileCompleted,
        },
        profile: profile || {},
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
      res.status(400).json({ error: error.message });
    }
  };