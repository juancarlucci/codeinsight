const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  gh: {
     id: String,
     access_token: String,
     firstName: String,
     lastName: String,
     email: String
   }
});
