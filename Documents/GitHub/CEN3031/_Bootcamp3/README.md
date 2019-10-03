# Creating a server-side API module using Express
### Overview
In Bootcamp# 1, we created a server to host our UF Directory App by implementing a primitive server-side router that responded to a single GET requests to '/listings' that retrieved our listings from a json file and sent the directory listingsto the client’s browser. 

In Bootcamp #2, we worked with MongoDB Atlas database (DBaaS) to make our listing data persistent. We setup communication between database (MongoDB Atlas) and server (node.js) using Mongoose as our connection driver.  We then created a database schema to organize the listings and we wrote a script `JSONtoMongo.js` to populate the database from the json file. We also created some test queries `queries.js` to ensure that our database worked.

In this thrid bootcamp, we will add more functionality to this server by integreating in the CRUD functionality of Bootcamp #2 to create, read, update, and delete listings from a Mongo database as well as implement a server-side API that will allow us respond to http requests for creating, updating, and deleting listings from the client/browser. We will also use a 3rd party geocoding API, open cage data, to retreive latitude and longitude coordinates for new buidlings we add to this database. 

## Introduction to Express & Middleware
[***Express***](https://expressjs.com/) is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls. Middleware functions are functions that have access to the request object (req), the response object (res), and the next() middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.
- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:
- Application-level middleware
- Router-level middleware
- Error-handling middleware
- Built-in middleware
- Third-party middleware

### How Middleware Works
Understanding the concept of **middleware** is extremely important in using Express effectively. Middleware are software architecture tools that allow you to invoke functions on a request before it reaches its final request handler. As a simple (yet quite useless) example, let's add a greeting to each request made to the server. 

```javascript
/*app.use() Invokes this middleware function every time a request is 
received on any route for the express server */
app.use(function(req, res, next) {
  req.greeting = 'Hello there!';
  next();
});

//GET routing request handler
app.get('/', function(req, res) {
  res.send(req.greeting);
});
```
In addition to the usual request (req) and response (res) objects, we now pass an additional object called *next()*. Invoking *next()* will pass the request on to whatever function is next in line to handle it. When there are a series of middleware function called one after the other it is considered a *middleware chain.* When the last one is called it sends the response back the the browser. You must call next() unless it is the last function in the chain, otherwise it will cause the browser to hang. Side Note: Passing functions and the results of those functions as parameters, is a common pattern in functional programming and cool feature of Javascript. 
 
Now, let's consider a more useful scenario, say the application we are building has users with administrative privledges. There will be certain routes that we want to make sure the user has the correct privledges before allowing the request to be handled. Using Express, this becomes a relatively simple task:

```javascript
//CheckPermissions Middleware
var checkPermissions = function(req, res, next) {
  if(req.isAdmin === true) {
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
});
```

The `checkPermissions` function serves as *middleware* that is invoked before passing the request to its final destination. If the user has the right credential, it is granted access and the next() function is called and program control returned back to this request handler and proceeds on. If it doesn't then, it errors out and no permission is granted.

A final note: **order matters** when using middleware. If you place `app.use()` after a request handler, that middleware will not be invoked. Keep this in mind when developing your applications in case you encounter bugs. 

If the concept of middleware is still confusing, you can read the [express documentation](https://expressjs.com/en/guide/using-middleware.html), an article on [writing middleware](https://expressjs.com/en/guide/writing-middleware.html), and these blog posts [post #1](https://medium.com/@agoiabeladeyemi/a-simple-explanation-of-express-middleware-c68ea839f498) and [post #2 ](https://medium.com/@jamischarles/what-is-middleware-a-simple-explanation-bb22d6b41d01)for further information. 

### Server-Side Routing API
In this Bootcamp, we will build middleware in Express to help us with server-side routing and implement business logic on resources (e.g., listings) to curate the content we want to serve up to the client. 

Let's start with ther server-side routing. Since we are looking to expand the functionality of our server from Bootcamp #1 to handle additional requests, we could handle them in the same fashion as the original request handler...but it would quickly become unweildly because there would need to be a bunch of conditional statements to handle requests to the different URL paths and different HTTP methods (such as POST, PUT, and DELETE). Luckily, the  [**Express**](https://expressjs.com/en/5x/api.html#express.router) library makes this task much simpler by providing a layer of abstraction for handling HTTP requests in a Node server. 

To provide an example, here is the request handler we wrote in Bootcamp 1:

```javascript
var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if(request.method === 'GET') {
    if(parsedUrl.path === '/listings') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(listingData));
    } else {
      response.writeHead(404);
      response.end('Bad gateway error'); 
    }
  } else {
    response.writeHead(404);
    response.end('Bad gateway error');
  }
};
```

Now here is the same request handler written using Express:
```javascript
app.get('/listings', function(req, res) {
  res.send(listingData);
});

app.all('/*', function(req, res) {
  res.status(404).send('Bad gateway error');
});
```
Looking for information on using Express as router middleware take a look at the [documentation](https://expressjs.com/en/guide/using-middleware.html#middleware.router). Also take a look at the documentation on [request](https://expressjs.com/en/4x/api.html#req) and [response](https://expressjs.com/en/4x/api.html#res) objects.

### Server-side Controllers
Express can also be used to create server-side controllers that contain the business logic for processing a resource. The controller will contain methods for handling all the [CRUD operations](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications). In your application, you many have multiple controllers that perform different functions on different resources. In this bootcamp, we have two controllers that help to manage coordinates and the listings. Check out this [tutorial](https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/) with code example to help you get started on developing the `listings.server.controller.js` and `coordinates.server.controller.js` files for this bootcamp.

This is an example update function for a contact controller from a [CRUD API tutorial](https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d)
``` Javascript
exports.update = function (req, res) {

//identify the contact to be updated
Contact.findById(req.params.contact_id, function (err, contact) {

//Check for an error
        if (err)
            res.send(err);

//Update the contact information
        contact.name = req.body.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                  res.status(400).send(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
```

A core concept used to implement server-side controllers using Express for Node.js are [exports and export modules] ](https://www.freecodecamp.org/news/node-js-module-exports-vs-exports-ec7e254d63ac/). The module.exports or exports is a special object which is included in every JS file in the Node.js application by default. `module` is a variable that represents the current module and `exports` is an *object* that will be *exposed as a module*. So, whatever you assign to module.exports or exports, will be exposed as a module. Exports and export modules do the same work of providing you with a "convenience" variable that you can use across files in your application. 

The module.exports object is automatically created by Node.js. and gets returned from require(). *Note: Exports is NOT returned by require() module.exports is returned.* module.exports is just a reference to a plain JavaScript object and empty object by default. It is fine to [use it to represent many different programmatic constructs](https://tutorialsteacher.com/nodejs/nodejs-module-exports) (e.g., string literal, function, models etc). There are two ways we can use module.exports:
    - Attaching public methods to it 
    - Replacing it with our custom object or function.

In Bootcamp #2, module.export is used to create a custom object in the `ListingSchema.js` file, exporting it as `Listing` at the end of the file. In Bootcamp #3, this file is renamed `listings.server.model.js`.
```javascript
/* Import mongoose and define any variables needed to create the schema */
    var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var listingSchema = new Schema({
  /* your code for the your schema listing */
});

listingSchema.pre('save', function(next) {
  /* create a 'pre' function that adds the updated_at and created_at properties */
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
```
In Bootcamp #3, exports is used to implemenet a set of functions in `listings.server.controller.js`. *Note:* Using just exports.functionName (e.g., exports.read and exports.update) is exporting the functionality as you go. No need for a big export module.exports function at the end of the file.
```javascript
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');
    
/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
};

/* Update a listing - Complete the three tasks*/
exports.update = function(req, res) {
  var listing = req.listing;
  
  /* (1) Replace the article's properties with the new properties found in req.body 
    (2) save the coordinates (located in req.results if there is an address property)
    (3) Save the article 
    */
 };
```
**Now the questions is how do you use these modules?** 
You **Import modules** at the top of the files in which you want to use them. Notice at the top of this file, `listings.server.controller.js` we have imported the Lisitngs model as a variable `var Listing = require('../models/listings.server.model.js');` 
This provides the controller the access to the listing model.

Check out the following tutorials for simple examples and explanation of [exports](https://www.sitepoint.com/understanding-module-exports-exports-node-js/), [export modules](https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/), and importing modules. 

### Open Cage Data - Open Source Map & Geocoding API
Along with building our own API, for this assignment, we will be using a 3rd party Geocoding API to retreive coordinates for each new building we add to our database. We will be using **forward geocoding** to identify the `latitude` and `longitude` from a given address. In particular, we will be retreiving the value from `results.geometery`, see [quick start guide](https://opencagedata.com/api#quickstart) for more details. To use this API you must Sign-up for a [free public key](https://opencagedata.com/) that you will add to your config file.  Learn more by visiting the following links
- see [course slides ](https://drive.google.com/file/d/1eSecDjL-vVvuQQdIDEN-ZmiMobmwXxUc/view)that provide and overview of open cage data.
- [open cage data api](https://opencagedata.com/api#intro)
- play around with the API using the [tutorial](https://opencagedata.com/code#tutorials) and [demo](https://opencagedata.com/demo) to see how it works

### API Testing with Postman
[Postman](https://www.getpostman.com/product/api-client) is an API Development and Testing Environment. It has many cool features and support for developers who are creating backend APIs. We will be using Postman's features for sending HTTP requests and viewing HTTP respnonses by creating and testing REST queries.

For this assignment, it may be useful to use Postman to check that you are formatting your routes appropriately before putting them in your code. It is also useful when you don't have a front-end hooked up to your backend so that you can test that your code works. **Check out this [postman tutorial](https://www.guru99.com/postman-tutorial.html)** for a walk through of the tool and its features. It is a great tool to have in your pocket and well worth the time investment.

## Assignment Details
Now go ahead and fork this assignment's repository. You'll notice that the file structure of the application is now more involved than previous assignments. Browse around and take note of where each part of the application exists. 

Navigate to `server/config/express.js`. This is where you will place code to configure your Express application. The **morgan** module is used to log requests to the console for debugging purposes. The **body parser** module is middleware that will allow you to access any data sent in requests as `req.body`. 

In `server/routes/listings.server.routes.js`, you will find code that specifies the request handlers for CRUD tasks. To learn more about the Express router, [go to this page](http://expressjs.com/en/guide/routing.html) and scroll down to the section on *express.Router.*

### Part 1 - Submit PDF in Canvas to Bootcamp #3
Create a diagram of how the different parts of the server interact with one another and add descriptive text as needed to demonstrate your understanding of the functionality of each file and their relationships to each other. Specifially make note of: 
   - the relationship between server.js, app.js, and express.js and the router file. With your starting point in the application being `server.js`
    - how the router makes use of the controllers and model to determine the flow of request handling. Trace through each routes in `listings.server.routes.js` as the basis of your diagram. Consider makine a sequence diagram (http://www.agilemodeling.com/artifacts/sequenceDiagram.htm) to help you communicate the flow of calls and data. 
   - the content defined in each controller and their roles in the application
    - how middleware is used throughout the application to modularize the code (e.g., (application-level, routing, controller, etc)
   - the relationship between the test files and the missing functionality of the files you will need to update. What do they tell you need to do?
   
### Part 2 - Submit in GitHub
This Bootcamp is an exercise in test driven development (TDD). When you first start this assignment all your test will most likely be failing. Your job is to write code to get tests to pass. Work on one test at a time. You will find it to be quite gratifying when your code passes a test. You should also try to make you own test cases and see if you can pass them. This is a really great practice to better understand the tests in these assignments and to test your understanding of how your code works. 

#### To Do List
1. Update your `config.s` file using the config.example.js
    - Add in your MongoDB Atlas URI
    - Sign-up for a free public key https://opencagedata.com/ and add it to your config file - This key will allow us to access open cage data's `geocoding api` to retreive coordinates for new buildings you add to the application.

2. Complete the app configuration in `express.js`. 
  - It should serve the static files found in the `public` folder when a user makes a request to the path `/`. [Refer to this documentation](http://expressjs.com/en/starter/static-files.html) for help. 
  - It should use the listings router for requests going to the `/api/listings` path. 
  - Last it should direct users to the client side `index.html` file for requests to any other path
  - now run node `server.js` to see how our server is working and navigate to `http://localhost:8080` in the browser. Try some of the routes and see what happens. Right now, we only serve up index.html and the server hangs for all the other routes in our express.js file
    Note: this may require several npm install commmands for `Mongoose` , `express` , `morgan` , and `request` before it will run properly.

3. In MongoDB Atlas, delete your database from Bootcamp2 so you can start clean. Setup an empty database to begin our development.

4. Implement the `listings.server.model.js` file this is our mongoose model for our database
    - **before you start coding** navigate to `server/tests` folder, review and **run** the model test `mocha listings.server.model.test.js`  
    *note:* The functionality your code needs to pass, which tests pass, and the content of your database
    *note:* You may have to install some packages using npm install -g `package name`
    - **now open** the `listings.server.model.js` file, you'll notice that this file looks a lot like the `ListingSchema.js` file from Bootcamp Assignment #2 because it is exactly the same so it should be easy to implement the functionality.
    - **test your implementation** again by running the tests found in `listings.server.model.test.js`
    - try creating your own test: add a test listing at the top of the file and copy, paste, and modify one of the test to see if you can get it to run and successfully pass. Note the content of your database. 

5. In MongoDB Atlas, delete the current content of your database. Then reinitialize it by running    `node JSONtoMongo.js` out of the Bootcamp #2 directory. Check your database and make sure you have 147 documents before proceeding.

6. Implement the request handlers `update`, `delete`, `list` in `listings.server.controller.js`
    - **before you start coding** navigate to `server/tests` folder, review and run the model test `mocha listings.server.routes.test.js`  - note what functionality your code needs to pass
    *note:* You may have to install some packages using npm install -g `package name`
    - **implement functionality**  `update`, `delete`, `list` in `listings.server.controller.js` see notes and tutorials identified earlier in this README file for help.
    **You may want to use [postman](https://www.getpostman.com/downloads/) to develop and manually test your update, delete, list routes** (*Note:* You will have to start your server to use Postman run `node server.js`. )
    (i)  The following should GET a single listing by ID, copy and paste a single entry "id" from your database to replace the <ID> tag `http://localhost:8080/api/listings/<ID>`
    (ii) The following sould GET all the listing - `http://localhost:8080/api/listings`
    (iii) Try also to test out your post and update requests
    - **run automated tests on your implementation** by running the mocha test found in the test folder `listings.server.routes.test.js` - some test may still fail. See notes in the test file to help resolve errors.

5. Make sure your server is functioning correctly by starting it up by running the command `node server.js.` Manually **browser test your routes** try adding a test to create or update a listing and check the database to see if it is there. You may manually have to deleted the listing once you add it, unless you add a test to delete it.

6. Complete the `coordinates.server.controller.js` you will need to connect to opencagedata.com to lookup the address provided in the listing and add the latitude and longitude coordinates for the new listing you've added. This will require you to
    - **construct a template for your request string** see open cage date [quickstart](https://opencagedata.com/api#quickstart) guide and [best practices](https://opencagedata.com/api#bestpractices) for string construction. 
    - Consider using **postman** to help you test out the right connection string format, see [open cage postman tutorial](https://opencagedata.com/tutorials/geocode-in-postman)
    - **parse the response** for the results you need: `latitude` & `longitude`. Note: `listins.server.controller.js` is using the `req.results` to update the listing. *Assumption:* For the purpose of this assignment, assume we find a match and the first result returned is our address. The results for building on campus aren't super robust in the open cage data. Resolving this issues is beyond this scope of this assignment. 
    - **be sure to add error handling** if the address provided fails due to formatting. You don't want your application to crash. 
    - **test** your implementation again to ensure that your application is actually changing the database and retreiving from the database. Consider writing or adapting a test to ensure the latitude and longitude are properly saved.


