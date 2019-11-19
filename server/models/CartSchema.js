const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Listing'
            }
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);