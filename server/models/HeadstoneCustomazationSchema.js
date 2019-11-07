var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var headStoneSchema = new Schema({
    ListingID: {type:String, required: true},
    UserID: {type:String, required: true},

    Name: String,
    DateOfBirth: Date,
    DateOfDeath: Date,
    Epitaph: String
});

var HeadStoneCustomizaton = mongoose.model('HeadStoneCustization',headStoneSchema);
module.exports = HeadStoneCustomizaton