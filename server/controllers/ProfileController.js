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
  
      res.json({ redirect: '/student/dashboard' }); 
    } catch (error) {
      console.error('Error saving profile:', error);
      res.status(400).json({ error: error.message });
    }
  };

  exports.checkProfileCompletion = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secretkey');
      const student = await Student.findById(decoded.id);
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      if (student.profileCompleted) {
        res.json({ redirectPath: '/student/dashboard' });
      } else {
        res.json({ redirectPath: '/student/profile' });
      }
    } catch (error) {
      console.error('Error verifying token or checking profile:', error);
      res.status(401).json({ error: 'Invalid token' });
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
          verified:student.verified
        },
        profile: profile || {},
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
      res.status(400).json({ error: error.message });
    }
  };


exports.updateStudentInfo = async (req, res) => {
  const { name, email, phone, aadhar, branch, course } = req.body;
  const studentId = req.user.id; 

  try {
    
    if (!name || !email || !branch || !course) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, email, phone, aadhar },
      { new: true } 
    );

    await Profile.findOneAndUpdate(
      { student: studentId },
      { branch, course },
      { new: true }
    );

    // Respond with the updated student information
    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Error updating student info:', error.message);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

  