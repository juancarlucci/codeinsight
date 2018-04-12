const mongoose = require('mongoose');


module.exports = mongoose.model('Repo', {

     id: String,
     name: String,
     owner_avatar: String,
     homepage: String,
     language: String,
     stars: Number,
     forks_count:Number,
     created_at: Date,
     updated_at: Date
     
});
