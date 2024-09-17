const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController'); // Make sure this path is correct

// Define routes with corresponding controller methods
router.get('/colleges', AdminController.getColleges);
router.get('/profiles/all', AdminController.getProfiles); // Ensure this method exists in your controller
router.get('/students/:id/files', AdminController.getStudentFiles); // Ensure this method exists in your controller
router.delete('/colleges/:id', AdminController.deleteCollege); // Ensure this method exists in your controller

module.exports = router;
