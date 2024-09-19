const express = require('express');
const router = express.Router();
const { updateStudentProfile } = require('../controllers/adminController');
const { deleteStudentProfile } = require('../controllers/adminController');
const { getCollegesWithAttributes } = require('../controllers/adminController');
const { deleteCollege , updateCollege } = require('../controllers/adminController');
const AdminController = require('../controllers/adminController');

// Define routes with corresponding controller methods
router.get('/colleges', AdminController.getColleges);
router.get('/profiles/all', AdminController.getProfiles); 
router.get('/students/:id/files', AdminController.getStudentFiles); 
router.delete('/colleges/:id', AdminController.deleteCollege); 
router.put('/profiles/:id', updateStudentProfile);
router.delete('/profiles/:id', deleteStudentProfile);
router.get('/colleges/attributes',getCollegesWithAttributes);
router.delete('/colleges/:id', deleteCollege); 
router.put('/colleges/:id', updateCollege);

module.exports = router;
