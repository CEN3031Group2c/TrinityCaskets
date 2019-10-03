var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8089;
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

//here you create the server
app.listen(300, ()=>console.log('Example app listening on port 3000!'));