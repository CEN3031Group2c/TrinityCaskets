const express = require('express');
const bodyParser = require('body-parser');
const CartSchema = require('../models/CartSchema');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
    const user = req.body.user;
    const item = {
        product: req.body.product
    };

    CartSchema.findOne({ user: user })
        .then((foundCart) => {
            if (foundCart) {
                let products = foundCart.items.map((item) => item.product + '');
                if (products.includes(item.product)) {
                    CartSchema.findOneAndUpdate({
                            user: user,
                            items: {
                                $elemMatch: { product: item.product }
                            }
                        })
                        .exec()
                        .then(() => res.end());
                } else {
                    foundCart.items.push(item);
                    foundCart.save().then(() => res.end());
                }
            } else {
                CartSchema.create({
                    user: user,
                    items: [item]
                })
                    .then(() => res.end());
            }
        });
});

router.get('/', (req, res) => {
    CartSchema.findOne({ user: req.user.id })
        .populate('items.product')
        .exec((err, cart) => {
            if (!cart) {
                return res.send(null);
            }

            res.send(cart);
        });
});

router.put('/', jsonParser, (req, res) => {
    CartSchema.findById(req.body.cartId)
        .then((foundCart) => {
            foundCart.items = foundCart.items.filter((item) => item._id !== req.body.itemId);
            foundCart.save(() => res.end());
        });
});

router.delete('/', (req, res) => {
    CartSchema.findByIdAndRemove(req.query.id)
        .then(() => res.end())
        .catch((err) => res.send(err));
});

module.exports = router;