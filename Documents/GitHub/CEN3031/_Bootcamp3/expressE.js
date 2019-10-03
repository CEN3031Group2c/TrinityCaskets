var express = require('express'),
    app = express();

//express is a fast way to work with son

/* Global variables */
var listingData, server;

app.get('/info', function(request, respond)
{
//actual server
	respond.json('Hello world');
//if I were to use respond.send, I would have print the data as raw ==> You can not work with send and json at the same time
	//respond.send('Goodbye world');
});

app.get('/batman', function(request, respond)
{
//actual server
	respond.json('I am Batman');
//if I were to use respond.send, I would have print the data as raw ==> You can not work with send and json at the same time
	//respond.send('Goodbye world');
});

var checkPermissions = function(req, res, next) {
	if(req.isAdmin === true) {
		console.log('User have permission')
	  next();
	} else {
	  res.status(400).send('User does not have permission to access this path');
	}
  };
  /*GET request for route /privateData - before it can be accessed it must 
  first pass the criteria in the checkPermission middleware function
  */
  app.get('/privateData', checkPermissions, function(req, res) {
	res.send('Some really critical information');
	res.isAdmin = true;
  });


//here you create the server
app.listen(300, ()=>
{console.log('Example app listening on port 3000!')});
