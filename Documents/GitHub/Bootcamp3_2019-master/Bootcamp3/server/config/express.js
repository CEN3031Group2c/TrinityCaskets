var path = require('path'),  
    express = require('express'),  //refers to Express the middleware helper for Node.js 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'), 
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev')); //==>???

  //body parsing middleware 
  app.use(bodyParser.json());   //==>???

  /* serve static files - see http://expressjs.com/en/starter/static-files.html */
  app.use('/', express.static(__dirname + '/../../client'));   //==>???

/* The next three middleware are important to the API that we are bulding */

  /* Request Handler for route /api/lisings
     Update the code to meet the required format - app.use('/api/listings', appropriateMiddlewWare)
     use the listings router middleware for requests to the api 
     check the variables list above
  */
  app.use('/api/listings', listingsRouter);


   /* Request Handler for coordinates
      This is a server wrapper around Open Cage Data Geocoding API to get latitude + longitude coordinates from address */
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });


  /* Request Handeler for all other routes
     Sends a response (res) to go to the homepage for all routes not specified */ 
  app.all('/*', function(req, res) {
   
   /*Add YOUR CODE HERE 
      see https://expressjs.com/en/api.html#res.sendFile
      see https://nodejs.org/api/path.html
      The path.resolve() method returns a string and resolves a sequence of paths or path segments into an absolute path.
      If no path segments are passed, path.resolve() will return the absolute path of the current working directory.
   */
   res.sendFile(path.resolve('client/index.html'));
  });
  
  return app;
};  