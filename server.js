/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////
var express           = require('express');
var path              = require('path');
var logger            = require('morgan');
var bodyParser        = require('body-parser');
var app               = express();
var mongoose          = require('mongoose');
var passport          = require('passport');
var expressSession    = require('express-session');
var cookieParser      = require("cookie-parser");
var axios             = require('axios');
const fs              = require('fs');
const dbUrl           = process.env.MONGO_URI || 'mongodb://localhost:27017/codeinsight';
require('./config/passport')(passport);
const User            = require('mongoose').model('User');

////////////////////////////////////////////////
//       DATABASE
// Mongoose Setup via mLab
////////////////////////////////////////////////
mongoose.connect(dbUrl);

////////////////////////////
// Middleware
///////////////////////////
app.use(cookieParser());
// app.use(expressSession({
//   secret: process.env.EXPRESS_SESSION_SECRET
// }));
app.use(expressSession({
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
// body parser config to accept datatypes
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
// serve static files in public
app.use(express.static('public'));

// Setting up the Passport Strategies
//NOTE: two parens, the first rturns a function, the second immediately
//invokes that function with "passport" as parameter
require("./config/passport")(passport)

///////////////////////////////////////////
/// ROUTES
/////////////////////////////////////////

// VERIFY AUTHENTICATION
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("User authenticated.");
    return next();
  } else {
    res.redirect('/');
  }
}

app.use('/api', ensureAuthenticated);

///////////////////////////////////
// HTML Endpoints /////////////////
app.get('/', function homepage(req, res) {
  res.render('index', {
    user: req.user
  });
});

app.get('/api/stats', function stats(req, res) {
  res.render('stats', {
    user: req.user
  });
});

app.get('/api/hot', function hot(req, res) {
  res.render('hot', {
    user: req.user
  });
});

///////////////////////////////////
//JSON API Endpoints //////////////

//test current user
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
})

app.get('/api/user/profile', function userRepo(req, res) {
  var username = req.user.gh.username;
  var encodedURI = `https://api.github.com/users/${username}`;

  axios
    .get(encodedURI)
    .then(function(response) {
      res.json({
        user: req.user,
        userProfile: response.data
      });

    })
    .catch((err) => {
      console.log(err);
      res.json({
        okay: 'erooor'
      })
    })
});

app.get('/api/user/username/repos', function allReposNames(req, res) {
  var username = req.user.gh.username;
  console.log("username", username);
  var encodedURI = `https://api.github.com/users/${username}/repos`;

  axios
    .get(encodedURI)
    .then(function(response) {
      res.json({
        user: req.user,
        data: response.data
      });

    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: 'erooor'
      })
    })
});

app.get('/api/user/:repo/languages', function repoLanguages(req, res) {
  var username = req.user.gh.username;
  var reponame = req.params.repo;
  console.log("username", username, reponame);
  var encodedURI = `https://api.github.com/repos/${username}/${reponame}/languages`;

  axios
    .get(encodedURI)
    .then(function(response) {
      res.json({
        user: req.user,
        data: response.data
      });

    })
    .catch((err) => {
      console.log(err);
      res.json({
        repoLanguages: 'erooorrr'
      })
    })
});

app.get('/api/repos/popular', function hot(req, res) {
  // var encodedURI = "https://api.github.com/users/juancarlucci";
  var encodedURI = 'https://api.github.com/search/repositories?q=stars:>48000+language:All&sort=stars&order=desc&type=Repositories';

  axios
    .get(encodedURI)
    .then(function(response) {

      res.json({
        user: req.user,
        popular: response.data
      });
    })
    .catch(err => {
      console.log('aaaa')
      return err;
    })
});


app.get('/api/current_user/:id', function(req, res) {
  db.User.findOne({
    _id: req.params.id
  }, function(err, data) {
    res.json(data);

  });
});

/////////////////////////////////////////////////////////////
//begins authentication. tell passport to use github strategy
app.get('/auth/github',
  passport.authenticate('github')); //takes user to oauth flow

//after passport gets token we are redirected here
app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get("/logout", function(req, res) {
  //passport attaches this method automatically
  //logout destroys cookieParser

  req.logout();

  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });

})

///////////////////////////////////////////
/// SERVER
/////////////////////////////////////////

//dynamic port assignment on heroku || localhost
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
