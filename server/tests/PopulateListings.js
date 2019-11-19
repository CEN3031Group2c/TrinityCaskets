var mongoose = require('mongoose')
var Listing = require("../models/ListingSchema")

mongoose.connect(process.env.DB_URI || require('../config/config').db.uri, {useNewUrlParser: true});

var listings = [{
    modelNumber : '1000',
    discription : 'test Casket',
    price : 0,
    type : 'Casket'
},
{
    modelNumber : '2000',
    discription : 'test urn',
    price : 0,
    type : 'urn'
},{
    modelNumber : '3000',
    discription : 'test Headstone',
    price : 0,
    type : 'Headstone'
}]

listings.forEach(function(element){
    new Listing({
        modelNumber: element.modelNumber,
        discription: element.discription,
        price: element.price,
        type: element.type
    }).save((err, listing) =>{
        if(err){
            throw err;
        }else{
            console.log(listing.discription + " added to database. \n");
        }
    })
})