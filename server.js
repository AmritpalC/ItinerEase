const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config()
// Connect to the database
require('./config/database')

// this gives us all the methods off of app, like app.use etc
const app = express();

// Log every request that hits our server
app.use(logger('dev'));

// Parses JSON paylods to the request.body key
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token and assign user object of payload to req.user. -> before routes
app.use(require('./config/checkToken'));

// ? API ROUTES WILL GO HERE -> before the catch all route!
app.use('/api/users', require('./routes/api/users'));

// Protect the api routes below from anon users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/itineraries', ensureLoggedIn, require('./routes/api/itineraries'));
app.use('/api/calendars', ensureLoggedIn, require('./routes/api/calendars'));

// API prefix will be used on every route so as not to clash with any client side routing
// If no API routes are hit, then serve the client
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});