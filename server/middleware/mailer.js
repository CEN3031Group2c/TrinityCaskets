var sendmail = require('nodemailer')
const config = require("../config/config")
var Cart  = require("../models/CartSchema")
var User = require("../models/UserSchema")
var Listings = require("../models/ListingSchema")




var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: config.emailAuth
})

function mailer(cartID){
   /* var cart;
    console.log(cartID);
     Cart.find({_id: cartID},function(err, foundCart){
         
         cart = foundCart
          console.log("Found Cart: ", foundCart)
          var userId = foundCart.user;
          var itemIds = foundCart.items;
          var userEmail
         if(err){
             throw err
         }
        User.findById(userId, function(err, foundUser){
            userEmail = foundUser.email;
            if(err){
                throw err
            }
         })
         itemIds.array.forEach(element => {
            Listings.findById(element.type, function(err, foundListing){
                itemModelNumbers.push(foundListing.modelNumber);
            })
        });
     });
     console.log("After the Query the cart is: ", cart)
     var itemModelNumbers = [];
     itemIds.array.forEach(element => {
         Listings.findById(element.type, function(err, foundListing){
             itemModelNumbers.push(foundListing.modelNumber);
         })
     });
     var emailBody = "The user: " + userEmail + " Has bought: " + JSON.stringify(itemModelNumbers);
     var adminEmails = [];
     User.find({admin: true}, function(err, foundUser){
         if(err){
             throw err;
         }
         adminEmails.push(foundUser.email)
     })
     adminEmails.forEach(element =>{
         var mailOptions = {
             from: config.emailAuth.user,
             to: element,
             subject: 'Purchase Made',
             text: emailBody
         }
         transporter.sendMail(mailOptions, function(err, info){
             if(err){
                 throw err
             }
             console.log(info);
         })
     })
     */

    User.find({admin: true}, function (err, admin){
        console.log(Array.isArray(admin))
        admin.forEach(function(element){
            console.log(element)
            sendmail({
                from: '<enter domainName when bought>',
                to: admin.email,
                subject: "Purchase made",
                html: "A purchase has been made at trinity casket store"
            }, function(err, reply){
                console.dir(reply)
            })
            console.log("ready to send email to ", element.email)
            transporter.sendMail(mailOptions, function(err,info){
                if(err){
                    throw err;
                }
                console.log(info);
            })
        })
      
    })
}

module.exports = mailer