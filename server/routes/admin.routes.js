// Middleware
const express = require('express');
// Function from express
const router = express.Router();
const bcrypt = require('bcryptjs');



// User Model
const UserSchema = require('../models/UserSchema');

// Route the post request
router.post('/', (req, res) =>{

    // Grab the input
    const { name, email, password, admin, items } = req.body;

    // Make sure all fields are filled out
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please fill out all fields' });
    }

    UserSchema.findOne({ email }).then(user => {
        // Check if email already exists
        if (user)
            return res.status(400).json({msg: 'Email already exists'});

        // If not, add new admin
        const newAdmin = new UserSchema({
            name,
            email,
            password,
            admin,
            items
        });

        // Create salt (random string of bits to encrypt)
        bcrypt.genSalt(10, (err, salt) => {
            // Hash (more encryption). Takes in password + the generated salt
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                if (err) throw err;
                // Update the password to be encrypted
                newAdmin.password = hash;
                // Save the new admin
                newAdmin.save();
            })
        });
    });


});


module.exports = router;