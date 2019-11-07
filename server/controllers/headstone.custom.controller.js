var mongoose = require('mongoose')
var HeadstoneCustomazation = require('../models/HeadstoneCustomazationSchema')

exports.create = function(req,res){
    //console.log(req);
    var headstone = new HeadstoneCustomazation({
    });
    headstone.UserID = req.body.userID;
    headstone.ListingID = req.body.headstoneID;
    console.log(headstone)
    headstone.save(function(err){
        if(err){
            console.log(err);
            res.status(400).send(err);
        }else{
            res.json(headstone);
            console.log(headstone);
        }
    })

}

exports.read = function(req,res){
    console.log( typeof userID, typeof headstoneID)
    console.log('called Listing by UserID and ListingID');
    HeadstoneCustomazation.findOne({UserID: req.params.userID,
    ListingID: req.params.headstoneID }).exec(function(err, headstone){
        if(err){
            res.status(400).send(err);
        }else{
            console.log('found headstone: ', headstone)
            res.json(headstone)
        }
    })
}

exports.update = function(req,res){
    

     HeadstoneCustomazation.findOne({
        UserID : req.params.userID,
        ListingID : req.params.headstoneID
    },
    function(err,headstone){
        console.log(headstone)
        if(!headstone){
            console.log('headstone not found')
        }
        if(err){
            console.log(err)
            throw err;
        }else{
            headstone.Name = req.body.Name;
            headstone.DateOfBirth = req.body.DateOfBirth;
            headstone.DateOfDeath = req.body.DateOfDeath;
            headstone.Epitaph = req.body.Epitaph;
            console.log(headstone)
            headstone.save(function(err){
                if(err){
                    console.log(err);
                    res.status(400).send(err);
                }else{
                    res.json(headstone);
                    console.log(headstone);
                }
            })
        }
        
    });

    
}

exports.delete = function(req,res){
    var headstone = getByUserIDAndListingID(req.params.userID, req.params.headstoneID);
    Headstone.deleteOne(headstone, (err) =>{
        if(err){
            console.log(err);
            res.status(400).send(err);
        }else{
            res.json(headstone);
            console.log(headstone)
        }
    })
}



getByUserIDAndListingID = function(userID, headstoneID){
    
    console.log( typeof userID, typeof headstoneID)
    console.log('called Listing by UserID and ListingID');
    HeadstoneCustomazation.findOne({UserID: userID,
    ListingID: headstoneID }).exec(function(err, headstone){
        if(err){
            res.status(400).send(err);
        }else{
            console.log('found headstone: ', headstone)
            return headstone;
        }
    })
}