/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////
var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var app            = express();
var mongoose       = require('mongoose');
const keys         = require("./config/keys");
var passport       = require('passport');
var expressSession = require('express-session');
var cookieParser   = require("cookie-parser");
const fs = require('fs');


// require('./models/User');



////////////////////////////////////////////////
//       DATABASE
// Mongoose Setup via mLab
//////////////////////////////////////////////// mongoose.connect('mongodb://localhost:27017/github-authentication-app');
//connect to mlab
// https://mlab.com/databases/cosdeinsight-dev#users
mongoose.connect(process.env.MONGO_URI || keys.mongoURI);
// mongoose.connect(process.env.mongoURI);

////////////////////////////
// Middleware
///////////////////////////
app.use( cookieParser() );
// app.use(expressSession({secret: 'octopuslikesroundstones'}));
app.use(expressSession({secret: process.env.EXPRESS_SESSION_SECRET || keys.expressSessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
// body parser config to accept datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
// serve static files in public
app.use(express.static(__dirname + '/public'));

// Setting up the Passport Strategies
//NOTE: two parens, the first rturns a function, the second immediately
//invokes that function with "passport" as parameter
require("./config/passport")(passport)

///////////////////////////////////////////
 /// ROUTES
 /////////////////////////////////////////

//////////////////
 // HTML Endpoints
 app.get('/', function homepage(req, res) {
   res.render('index', {user: req.user});
 });

 app.get ('/api/profile', function profile(req, res) {
   res.render('profile', {user: req.user});
 });


/////////////////////
 //JSON API Endpoints

// app.get('/', function(req, res){
//   res.render('index', {user: req.user});
// });

//test current user
app.get('/auth/current_user', (req, res) => {
  console.log("current user");
  res.send(req.user);
})

//begins authentication. tell passport to use github strategy
app.get('/auth/github',
  passport.authenticate('github')); //takes user to oauth flow

//after passport gets token we are redirected here
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/")
})

///////////////////////////////////////////
 /// SERVER
 /////////////////////////////////////////

//dynamic port assignment on heroku || localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
