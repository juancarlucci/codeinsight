const mongoose = require('mongoose');

// const { Schema } = mongoose;
// const userSchema = new Schema({
//   gh: {
//      id: String,
//      access_token: String,
//      firstName: String,
//      lastName: String,
//      email: String
//    }
// });
// mongoose.model("users", userSchema);


module.exports = mongoose.model('User', {
  gh: {
     id: String,
     access_token: String,
     firstName: String,
     lastName: String,
     email: String
   }
});
