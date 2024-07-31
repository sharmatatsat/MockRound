const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Route to get all colleges
router.get('/colleges', AdminController.getColleges);

// Route to get all students
router.get('/students', AdminController.getStudents);

// Route to get student files by student ID
router.get('/students/:id/files', AdminController.getStudentFiles);

module.exports = router;
