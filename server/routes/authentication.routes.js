// User/admin authentication (i.e. check if password is correct)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
config = require('../config/config');
const jwt = require('jsonwebtoken');
// Need a way to constantly validate path
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

        // If user does exist, check password using bcrypt's compare
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Wrong password' });

            // If it does match, want to send token back
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )
        })
    })
});

// Get the user data
router.get('/user', auth, (req, res) => {
    // Get ID
    UserSchema.findById(req.user.id)
        // Don't want to get password for security reasons
        .select('-password')
        // Pass the promised user
        .then(user => res.json(user));
});

module.exports = router;