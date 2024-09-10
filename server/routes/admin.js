const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { deleteCollege } = require('../controllers/adminController');


router.get('/colleges', AdminController.getColleges);


router.get('/profiles/all', AdminController.getProfiles); // Updated route


router.get('/students/:id/files', AdminController.getStudentFiles);


router.delete('/colleges/:id', deleteCollege);



module.exports = router;
