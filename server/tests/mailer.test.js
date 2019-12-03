var mailer = require("../middleware/mailer")
var mongoose = require("mongoose")
var config = require("../config/config")
var Listing = require("../models/ListingSchema")
var Cart = require("../models/CartSchema")
console.log("Testing start")


mongoose.connect(process.env.DB_URI || require('../config/config').db.uri, {useNewUrlParser: true});
Listing.findOne({modelNumber: "7000"}, function(err, listing){
    console.log(listing)
})

mongoose.connection.on('connected',() =>{
    mailer("5dd4229eac5b4c79900a65ac")
})