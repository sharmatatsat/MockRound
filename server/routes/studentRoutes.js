const express = require('express');
const { registerStudent, loginStudent } = require('../controllers/studentController');
const router = express.Router();

router.post('/signup', registerStudent);
router.post('/login', loginStudent);

module.exports = router;
