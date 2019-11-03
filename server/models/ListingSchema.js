var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
    modelNumber : {type: String, required: true},
    discription : {type: String, required: true}, //The Model number and Discription will be the used to "name" the listing on the store page
    price: {type : Number, required: true},
    type: {type: String, required: true}, //Is this a casket, urn or something else?
    compareToPrice: Number,    //Based off what I saw in the best caskets website
    stock: Number,             //How many are left in stock, not asked for but could be useful to have stored somewhere
    tags: [String],             //Properties of the item for sale, can be usesful for impelmenting search/filter functionality down the road
    created_at: Date,
    updated_at: Date
});

listingSchema.pre('save',function (next){
    var currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at)
        this.created_at = currentDate;
    next();
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;