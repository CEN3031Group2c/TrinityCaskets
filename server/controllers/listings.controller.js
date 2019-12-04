/* Dependencies */
var Listing = require('../models/ListingSchema.js');
var Cart = reqire("CartSchema.js")
/* Create a listing */
exports.create = function (req, res) {

    console.log(req.user);
    /* Instantiate a Listing */
    var listing = new Listing(req.body);

    /* Then save the listing */
    listing.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(listing);
            console.log(listing);
        }
    });
};

/* Show the current listing */
exports.read = function (req, res) {
    /* send back the listing as json from the request */
    res.json(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function (req, res) {
    var listing = req.listing;

    /* Replace the listings's properties with the new properties found in req.body */
    if (req.body.modelNumber)
        listing.modelNumber = req.body.modelNumber;
    if (req.body.description)
        listing.description = req.body.description;
    if (req.body.price)
        listing.price = req.body.price;
    if (req.body.image)
        listing.image = req.body.image;
    if (req.body.type)
        listing.type = req.body.type;
    if (req.body.compareToPrice)
        listing.compareToPrice = req.body.compareToPrice;
    if (req.body.stock)
        listing.stock = req.body.stock;
    if (req.body.tags)
        listing.tags = req.body.tags;

    /* Save the listing */
    listing.save((err) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(listing);
            console.log(listing);
        }
    });
};

/* Delete a listing */
exports.delete = function (req, res) {
    var listing = req.listing;

    Listing.deleteOne({
        _id: listing._id
    }, (err) => {

        Cart.updateMany({
            items: {
                products: {
                    type: listing.id
                }
            }
        },{
            items: {
                
            }
        }, function(err,cart){
            if(err){
                throw err;
            }
        })

        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send('deleted');
            console.log('deleted');
        }
    });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function (req, res) {
    /* Add your code */
    Listing.find({}).sort({
        modelNumber: 'asc'
    }).exec((err, listings) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(listings);
            console.log(listings);
        }
    });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 
 */
exports.listingByID = function (req, res, next, id) {
    Listing.findById(id).exec(function (err, listing) {
        if (err) {
            res.status(400).send(err);
        } else {
            req.listing = listing;
            next();
        }
    });
};