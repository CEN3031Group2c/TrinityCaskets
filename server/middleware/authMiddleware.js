// Middleware to be used for checking if user is logged in before they are allowed to do something

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Get the token from the header of the jwt
    const token = req.header('x-auth-token');

    // If token isn't there, deny authorization
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        // Verify token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET || require('../config/config').jwt.jwtSecret);
        // Grab the user from the payload and set it as the request
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = authMiddleware;
