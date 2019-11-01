// Middleware for private routing of password and user info

const config = require('config');
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Fetch the header value from the token
    const token = req.header('x-auth-token');

    // Check token
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });

    // If there is a token, need to verify
    try {
        // Verify w/ our secret key
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Decode user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = authMiddleware();