const jwt = require('jsonwebtoken');
const Student = require('../models/Student'); // Ensure this path is correct
const Profile = require('../models/Profile'); // Ensure this path is correct
const College = require('../models/College'); // Ensure this path is correct
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from the authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attempt to find a student, profile, or college based on decoded token id
      let user = await Student.findById(decoded.id).select('-password');

      // If no student is found, look for the profile
      if (!user) {
        user = await Profile.findById(decoded.id).select('-password');
      }

      // If no profile is found, look for the college
      if (!user) {
        user = await College.findById(decoded.id).select('-password');
      }

      // If no user (student, profile, or college) is found, return an error
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach the found user (student, profile, or college) to req.user
      req.user = user;
      
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
