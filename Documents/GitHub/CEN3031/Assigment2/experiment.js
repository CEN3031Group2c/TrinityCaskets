var http = require('http'), 
    fs = require('fs'), 
    port = 8080;

/* Global variables */
var listingData, server, superM;

var requestHandler = function(request, response) 
{
	//response.end(listingData);
	superM.entries.forEach(element => {
		response.write(JSON.stringify(element));
		response.write('\n');
	});
	
	response.end('hello');
	var text = ["name", "Jose", "pokemon", "pikachu"];
	//text.forEach(function(elem)
	//listingData.forEach(function(elem)
//	{response.write(elem);});
//	response.end();
};

fs.readFile('listings.json', 'utf8', function(err, data) {


   //Check for errors
	if(err) throw err;
	//console.log('there has been no error');


   //Save the sate in the listingData variable already defined
	listingData = data;
	superM = JSON.parse(data);
	
	// superM.entries.forEach(element => {
	// 	console.log(element);
	// 	console.log('\n');
	// });
	



   //Creates the server
	var server = http.createServer(requestHandler);


   //Start the server
	server.listen(port, function() 
	{
		console.log('Server listening on: http://127.0.0.1:' + port);
	});

});
