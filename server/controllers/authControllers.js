const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student'); // Ensure this path is correct

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = generateToken(user._id);
        res.status(201).json({ _id: user._id, email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        // Determine the redirect path based on profile completion
        const isProfileComplete = user.profile && user.profile.isComplete;
        const redirectPath = isProfileComplete ? '/college/dashboard' : '/college/profile';
        
        res.json({ _id: user._id, email: user.email, token, redirectPath });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.registerStudent = async (req, res) => {
    const {name, email, password } = req.body;

    try {
        const student = await Student.create({ name,email, password });
        const token = generateToken(student._id);
        res.status(201).json({ _id: student._id, email: student.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(student._id);

        // Determine the redirect path based on profile completion
        const isProfileComplete = student.profile && student.profile.isComplete;
        const redirectPath = isProfileComplete ? '/student/dashboard' : '/student/profile';

        res.json({ _id: student._id, email: student.email, token, redirectPath });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
