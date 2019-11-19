const express = require('express');
const bodyParser = require('body-parser');
const UserSchema = require('../models/UserSchema');

const router = express.Router();
const jsonParser = bodyParser.json();

exports.post = function (req, res) {

    const item = {
        product: req.body.product
    };

    UserSchema.findOne({_id: req.body.user._id})
        .then((foundCart) => {
            if (foundCart) {
                let products = foundCart.items.map((item) => item.product + '');
                if (products.includes(item.product)) {
                    UserSchema.findOneAndUpdate({
                        items: {
                            $elemMatch: {product: item.product}
                        }
                    })
                        .exec()
                        .then(() => res.end());
                } else {
                    foundCart.items.push(item);
                    foundCart.save().then(() => res.end());
                }
            }
        });
};

exports.get = function (req, res, userToGet) {
    console.log(userToGet);
    // Find one with the matching user id
    UserSchema.findOne({_id: req.body.user._id})
        .populate('items.product')
        .exec((err, cart) => {
            res.send(cart);
        });
};