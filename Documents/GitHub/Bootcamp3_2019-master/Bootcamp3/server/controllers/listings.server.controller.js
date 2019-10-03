
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://www.sitepoint.com/understanding-module-exports-exports-node-js/
  or
  https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
 
  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.json(listing);
      console.log(listing)
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
var listing = req.listing;
  //console.log('Here is my id: ' + id);
 // var id_ = arguments.split(' ');
//  console.log('Here is my id version: ' + req.path); //it work
//  console.log('Here is my id version 2: ' + req.path.substr(1)); //it work

 var listto = req.path.substr(1);
 
Listing.findByIdAndUpdate(listto, req.body, {new: true},  function(err, listing)
{
  if(err)
  {
    console.log('it does not work');
    res.status(404).send(err)}
  else
  {
  
    if(req.body.code)
    {listing.code = req.body.code;}
    //else {listing.code = 'working';}
    
  
    console.log('codeL2: ' + listing.code);
    if(req.body.name)
    {listing.name = req.body.name;}
    //else {listing.name = 'batman';}
    if(req.body.coordinates)
    {
    listing.coordinates.latitude = req.body.coordinates.latitude;
    listing.coordinates.longitude = req.body.coordinates.longitude;
    }

    if(req.body.address)
    {listing.address = req.body.address;}

   // return listing;

    listing.save(function(err, listing)
    {
      if(err)
      {
        console.log('there is something wrong');
        res.status(404).send(err)}
      else
      {
        console.log('update happen');
        res.send(listing);
      }
    })
  }

  
})

};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;


var listto = req.path.substr(1);
 console.log('Here is my delete id version 3: ' + listto);

Listing.findByIdAndRemove(listto, function(err, listing)
{
  if (err)
  {
      res.status(404).send(err);
  }
  else
  {
    res.send(listing);
    console.log('happenXX');
  }
})




};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  //var listing = req.listing ;
  /* Add your code */
  Listing.find(function(err, listing)
  {
    if(err)
    {
      res.status(400).send(err);
    }
    else
    {
      res.send(listing.sort(function(a,b){
       if(a.code < b.code) {return -1; }
       if(a.code > b.code) {return 1; }
      }));
    }
  })

 };

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};