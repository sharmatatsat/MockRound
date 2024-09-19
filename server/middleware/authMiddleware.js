const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers.authorization;

  // Check if the token exists and starts with 'Bearer '
  if (authHeader && authHeader.startsWith('Bearer')) {
    // Extract the token (remove 'Bearer ' prefix)
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user (usually includes user id) to the request
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      // Token is invalid or expired
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    // No token provided or malformed header
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};

// module.exports = { protect };
