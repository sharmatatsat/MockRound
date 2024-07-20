const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.create({ email, password });
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

        if (student && (await student.matchPassword(password))) {
            const token = generateToken(student._id);
            res.json({ _id: student._id, email: student.email, token });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
