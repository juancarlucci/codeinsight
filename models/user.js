const mongoose = require('mongoose');


module.exports = mongoose.model('User', {
  gh: {
     id: String,
     username: String,
     accessToken: String,
     refreshToken: String,
     location: String,
     hireable: Boolean,
     email: String,
     blog: String,
     repos:Number,
     gists:Number,
     followers: Number,
     following: Number
   }
});
