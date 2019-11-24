// User/admin authentication (i.e. check if password is correct)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Need a way to constantly check if user is logged in
const auth = require('../middleware/authMiddleware');

// User schema
const UserSchema = require('../models/UserSchema');

// Post request to /api/authentication
router.post('/', (req, res) => {
    // Don't need name
    const { email, password } = req.body;

    // Check all fields have been filled
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please complete all fields' });
    }

    // Check if user exists
    UserSchema.findOne({ email }).then(user => {
        // If email is not attached to an existing user
        if(!user) return res.status(400).json({ msg: 'Invalid email' });

        // If user does exist, check if password is correct using bcrypt's compare
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Wrong password' });

            // If it does match, want to send token back
            jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || require('../config/config').jwt.jwtSecret,
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            admin: false
                        }
                    });
                }
            )
        })
    })
});


// Validate the user using the token from authMiddleware
router.get('/user', auth, (req, res) => {
    // Find the user information
    UserSchema.findById(req.user.id)
        // Don't want to return password for security
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;