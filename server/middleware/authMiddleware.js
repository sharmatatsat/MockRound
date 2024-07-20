const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                console.log('User not found');
                return res.status(401).json({ error: 'Not authorized, token failed' });
            }
            next();
        } catch (error) {
            console.log('Token verification failed:', error);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        console.log('No token provided');
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = { protect };
// qwe@qwe
// qwe