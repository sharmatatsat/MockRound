const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerStudent = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const student = await Student.create({ name, email, password });
        const token = generateToken(student._id);
        res.status(201).json({ _id: student._id, name: student.name, email: student.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (student && (await student.matchPassword(password))) {
            const token = generateToken(student._id);

            // Determine redirect path based on profile completion
            const redirectPath = student.profileCompleted ? '/student/dashboard' : '/student/profile';

            // Return the user data, token, and redirect path
            res.json({
                _id: student._id,
                name: student.name,
                email: student.email,
                token,
                redirectPath
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};