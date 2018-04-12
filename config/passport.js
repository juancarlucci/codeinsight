// const passport = require("passport");
// const mongoose = require("mongoose");
var User = require('../models/user');
// const User = mongoose.model('users');
// var FacebookStrategy = require('passport-facebook').Strategy;

const GitHubStrategy = require('passport-github').Strategy;

/////////////////////////
// CREREATE User Token from user info. We got user info
// from the GitHubStrategy callback function.
// That token will be put into a cookie
module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    //this user._id is not the profile.id
    // this is the id automatically generated by mongo
    //this allows us to use mutiple OAuth providers without collision
    done(null, user._id);
  });

//Token stored in Cookie in browser is now deserialized to
//turn token into User
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {

      done(err, user);
    });
  });

  passport.use(new GitHubStrategy({
    clientID      : process.env.GITHUB_CLIENT_ID,
    clientSecret  : process.env.GITHUB_CLIENT_SECRET,
    callbackURL   : "http://localhost:3000/auth/github/callback",
    proxy         : true
  }, function(accessToken, refreshToken, profile, done) {

    process.nextTick(function() {


      User.findOne({ 'gh.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();
          newUser.gh.id           = profile.id;
          newUser.gh.username     = profile.username;
          newUser.gh.accessToken  = accessToken;
          newUser.gh.refreshToken = refreshToken;
          newUser.gh.location     = profile._json.location;
          newUser.gh.hireable     = profile._json.hireable;
          newUser.gh.email        = profile._json.email;
          newUser.gh.blog         = profile._json.blog;
          newUser.gh.repos        = profile._json.public_repos;
          newUser.gh.gists        = profile._json.public_gists;
          newUser.gh.followers    = profile._json.followers;
          newUser.gh.following    = profile._json.following;

          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser);
          });
        }
      });
      });
  }));

}
