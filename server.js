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
var axios          = require('axios');
const fs = require('fs');
const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/codeinsight';
const api = require('./public/scripts/api');
require('./config/passport')(passport);
// var db = require('./models');

// require('./models/User');



////////////////////////////////////////////////
//       DATABASE
// Mongoose Setup via mLab
//////////////////////////////////////////////// mongoose.connect('mongodb://localhost:27017/github-authentication-app');
//connect to mlab
// https://mlab.com/databases/cosdeinsight-dev#users
mongoose.connect(dbUrl);
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
// app.use(express.static(__dirname + '/public'));

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
        return next(); }
    // res.redirect('/api/');
}

app.use('/api', ensureAuthenticated);

//////////////////
 // HTML Endpoints
 app.get('/', function homepage(req, res) {
   res.render('index', {user: req.user});
   // res.sendFile(path.join(__dirname+'/index.html'));
   // res.render('index.html');
 });

 app.get ('/api/profile', function profile(req, res) {
   res.render('profile', {user: req.user});
 });
 app.get ('/api/hot', function hot(req, res) {
   res.render('hot', {user: req.user});
   //NOTE sendFile no longer works in Express v3.x
   //need to use sendfile instead (lowercase f)
   //https://stackoverflow.com/questions/34194245/res-sendfile-is-not-a-function-node-js
   // res.sendfile(__dirname + '/views/hot.html');
 });

 app.get ('/api/popularRepos', function hot(req, res) {
   res.render('hot', {user: req.user});
 });

///SEARCH Repos by TOPIC
app.get ('/api/search/:topic', function hot(req, res) {
  var topic = req.params.topic;
  // console.log(topic);
//   var encodedURI = encodeURI("https://github.com/search?utf8=%E2%9C%93&q=topic%3A"+ topic + "&type=Repositories&ref=searchresults");
//
// console.log(encodedURI);
//   axios
//     .get(encodedURI)
//     .then(function (response) {
//       console.log("*******************topic",response.data.items);
//       res.json({user: req.user, topic: response.data.items});
//     })
//     .catch(err => {
//       return err;
//     })

  });



 // const axios = require('axios');
 //
 // var id = process.env.GITHUB_CLIENT_ID;
 // var sec = process.env.GITHUB_CLIENT_SECRET;
 // var params = "?client_id=" + id + "&client_secret=" + sec;
 //
 // app.get ('/api/hot', function hot(req, res) {
 //
 //     axios.get('https://api.github.com/users/' + req.user.gh.username + params)
 //       .then((user) => {
 //       console.log(user);
 //         res.render('hot', {user: req.user, userData:user.data});
 //       }).catch(error => {
 //         console.log("ERROR: ", error)
 //       })
 //
 //
 // });








/////////////////////
 //JSON API Endpoints

// app.get('/', function(req, res){
//   res.render('index', {user: req.user});
// });

//test current user
app.get('/auth/current_user', (req, res) => {
  // console.log("current user");
  res.send(req.user);
})

// app.get('/api/repos/all', function (req, res) {
//   // send all repos as JSON response
//   db.Repo.find({},function(err, repos){
//     if (err) {
//       console.log("index error: " + err);
//       return res.sendStatus(500);
//     }
//     res.json(repos);
//   });
// });

app.get ('/api/repos/popular', function hot(req, res) {
  var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>48000+language:All&sort=stars&order=desc&type=Repositories');

  axios
    .get(encodedURI)
    .then(function (response) {

      res.json({user: req.user, popular: response.data.items});
      res.json(createReposFromData(json));
    })
    .catch(err => {
      return err;
    })

    function createReposFromData(json){
      json.data.items.forEach(function (repo){

        var newRepo = new Repo({
          id:repo.id,
          name: repo.name,
          owner_avatar: repo.owner.avatar_url,
          homepage: repo.homepage,
          language: repo.language,
          stars: repo.stargazers_count,
          forks_count: repo.forks,
          created_at: repo.created_at,
          updated_at: repo.updated_at
        });
        newRepo.save(function(err, repo) {
          if (err) {
            return console.log("save error: " + err);
          }
          console.log("Repo saved:", repo);

        });

      }) //end forEach
    } //end createReposFromData
//
});

// app.get("/allGames", function(req, res) {
//
//
// const url =
//  "https://api.fantasydata.net/v3/cbb/scores/JSON/Tournament/sim?key=e415ccd5602b4e06870ba5c497510cbd";
// fetch(url)
//  .then(response => {
//    response.json().then(json => {
//      res.json(
//        createGamesFromData(json)
//      );
//    });
//  })
//  .catch(error => {
//    console.log(error);
//  });
//
//
//  function createGamesFromData(json){
//    json.Games.forEach(function (game){
//
//      var newGame = new Game({
//        user: null,
//        email: null,
//        gameDay: game.Day,
//        gameAwayTeam: game.AwayTeam,
//        awayTeamScore: game.AwayTeamScore,
//        gameHomeTeam: game.HomeTeam,
//        homeTeamScore: game.HomeTeamScore
//      });
//      newGame.save(function(err, game) {
//        if (err) {
//          return console.log("save error: " + err);
//        }
//        console.log("Game saved:", game);
//
//      });
//
//    }) //end forEach
//  } //end createGamesFromData
// });

// // get all repos
// app.get('/api/repos', function (req, res) {
//  // send all repos as JSON response
//  db.Project.find({},function(err, repos){
//    if (err) {
//      console.log("index error: " + err);
//      return res.sendStatus(500);
//    }
//    res.json(repos);
//  });
// });

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
