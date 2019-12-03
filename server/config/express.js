if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // Router for user
    app.use('/api/user', require('../routes/user.routes'));
    // Router for admin
    app.use('/api/admin', require('../routes/admin.routes'));
    // Router for user authentication
    app.use('/api/authentication', require('../routes/authentication.routes'));
    // Router for listing
    app.use('/api/listings', require('../routes/listings.routes'));
    // Router for cart
    app.use('/api/cart', require('../routes/cart.routes'));

    app.use('/api/custom', require('../routes/headstone.custimaization.route'));

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
};

