var Listing = require("../models/ListingSchema")
const fs = require('fs');
const csv = require('csv-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI || require('../config/config').db.uri, {useNewUrlParser: true});

console.log("Testing")

var data = fs.createReadStream("data.csv")
    .pipe(csv()).on('data',(row) =>{
        new Listing({
            modelNumber: row.modelNumber,
            price: row.price,
            image: row.image,
            type: row.type,
            description: row.description
        }).save((err, listing) => {
            if(err){
                throw err
            }
        })
        console.log(row)

    })
    .on('end', () => {
        console.log('CSV file read Properly')
    })