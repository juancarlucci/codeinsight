// const passport = require("passport");
// const mongoose = require("mongoose");
var User = require('../models/user');
// const User = mongoose.model('users');
// var FacebookStrategy = require('passport-facebook').Strategy;
const keys = require("./keys");
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });

  passport.use(new GitHubStrategy({
    // clientID      : keys.githubClientID,
    // clientSecret  : keys.githubClientSecret,
    clientID      : keys.githubClientID || process.env.githubClientID,
    clientSecret  : keys.githubClientSecret || process.env.githubClientSecret,
    // callbackURL: "https://127.0.0.1:3000/auth/github/callback"
    callbackURL   : "https://localhost:3000/auth/github/callback",
    // callbackURL: "/auth/github/callback",
    proxy         : true
  }, function(accessToken, refreshToken, profile, cb) {

    console.log(profile);
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });


    // process.nextTick(function() {
    //
    //   User.findOne({ 'gh.id' : profile.id }, function(err, user) {
    //     if (err) return done(err);
    //     if (user) {
    //       return done(null, user);
    //     } else {
    //
    //       var newUser = new User();
    //       newUser.gh.id           = profile.id;
    //       newUser.gh.access_token = access_token;
    //       newUser.gh.firstName    = profile.name.givenName;
    //       newUser.gh.lastName     = profile.name.familyName;
    //       newUser.gh.email        = profile.emails[0].value;
    //
    //       newUser.save(function(err) {
    //         if (err)
    //           throw err;
    //
    //         return done(null, newUser);
    //       });
    //     }
    //
    //   });
    // });
  }));

}
