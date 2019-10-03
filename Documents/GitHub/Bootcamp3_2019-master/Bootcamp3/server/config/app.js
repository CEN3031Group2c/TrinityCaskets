var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express'); // refers to express.js file in our application not Express the Middleware helper for Node.js

module.exports.start = function() {
  var app = express.init();
  app.listen(config.port, function() {
    console.log('App.js file is listening on port', config.port);
  });
};