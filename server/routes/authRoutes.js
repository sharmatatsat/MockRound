const express = require('express');
const router = express.Router();
const { register, login,registerStudent,loginStudent } = require('../controllers/authControllers');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', register);
router.post('/login', login);
router.post('/signupStudent', registerStudent);
router.post('/loginStudent', loginStudent);




router.get('/protected', protect, (req, res) => {
    
    res.json({ message: 'You are authorized to access this route' });
});

module.exports = router;
