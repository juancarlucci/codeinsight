const mongoose = require('mongoose');


module.exports = mongoose.model('Repo', {

     id: String,
     name: String,
     owner_avatar: String,
     owner_html_url: String,
     homepage: String,
     language: String,
     stargazers_count: Number,
     forks_count:Number,
     created_at: Date
});
