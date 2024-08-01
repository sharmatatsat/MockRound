const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Route to get all colleges
router.get('/colleges', AdminController.getColleges);

// Route to get all student profiles
router.get('/profiles/all', AdminController.getProfiles); // Updated route

// Route to get student details including files
router.get('/students/:id/files', AdminController.getStudentFiles);

module.exports = router;
