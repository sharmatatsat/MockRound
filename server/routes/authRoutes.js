const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authControllers');
const { protect } = require('../middleware/authmiddleware');

// Signup route
router.post('/signup', register);

// Login route
router.post('/login', login);

router.get('/protected', protect, (req, res) => {
    
    res.json({ message: 'You are authorized to access this route' });
});

module.exports = router;
