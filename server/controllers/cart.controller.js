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
/* Show the current listing */
exports.read = function (req, res) {
    /* send back the listing as json from the request */
    res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
    UserSchema.findById(id).exec(function (err, user) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.get = function (req, res) {
    // Find one with the matching user id
    UserSchema.findOne({_id: req.body.user._id})
        .populate('items.product')
        .exec((err, cart) => {
            res.send(cart);
        });
};

exports.delete = function (req, res) {

    UserSchema.findOne({_id: req.body.user._id})
        .then((foundCart) => {
            foundCart.items.pull({_id: req.body.product._id});
            foundCart.save().then(() => res.end());
        });
};