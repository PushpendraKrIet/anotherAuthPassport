var express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database');

// configuration
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // passport for configuration

// set up the express application
app.use(morgan('dev')); // log every request to the console.
app.use(cookieParser()); // read cookis needed for auth
app.use(bodyParser()); // get information from HTML forms

app.set('view engine', 'ejs');


// required for passport 
app.use(session({ secret: 'ilovebutterscotch' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stroed in session

// routes ====================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// launch =========== launched already in Server.js
module.exports = app;