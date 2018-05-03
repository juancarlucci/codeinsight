var mongoose = require('mongoose');
var Schema = mongoose.Schema;

UserSchema = new Schema({
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
var User = mongoose.model('User', UserSchema);
module.exports = User;
