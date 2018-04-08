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

// require('./models/User');



////////////////////////////////////////////////
//       DATABASE
// Mongoose Setup via mLab
//////////////////////////////////////////////// mongoose.connect('mongodb://localhost:27017/github-authentication-app');
//connect to mlab
// https://mlab.com/databases/cosdeinsight-dev#users
mongoose.connect(keys.mongoURI);

////////////////////////////
// Middleware
///////////////////////////
app.use( cookieParser() );
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Setting up the Passport Strategies
//NOTE: two parens, the first rturns a function, the second immediately
//invokes that function with "passport" as parameter
require("./config/passport")(passport)

app.get('/', function(req, res){
  res.render('layout', {user: req.user});
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
