const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for a user
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            }
        }
    ]
});

var User = mongoose.model('user', UserSchema);
module.exports = User;