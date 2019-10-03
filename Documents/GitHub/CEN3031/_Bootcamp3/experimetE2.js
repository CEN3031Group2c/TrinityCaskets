var express = require('express'),
    app = express();
var url = require('url'),
    fs = require('fs');
var listingData, server;

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  
});

app.get('/listings', function(req, res) {
  console.log('Hello');
  res.send(listingData);
  //next();
});

app.all('/*', function(req, res) {
  res.status(404).send('Bad gateway error');
  next();
});


app.listen(2800, ()=>
{console.log('Example app listening on port 3000!')});

fs.readFile('package.json', 'utf8', function(err, data) {
  
	if(err) throw err;
   //Save the sate in the listingData variable already defined
	listingData = data;

});
