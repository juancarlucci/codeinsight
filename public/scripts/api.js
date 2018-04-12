//this code adapted from Tyler MCGinnis https://tylermcginnis.com/courses/react-fundamentals/

var axios = require('axios');
const keys = require("../../config/keys");


var id = process.env.GITHUB_CLIENT_ID;
var sec = process.env.GITHUB_CLIENT_SECRET;
var params = "?client_id=" + id + "&client_secret=" + sec;

// app.get ('/api/repos/popular', function hot(req, res) {
//   var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>48000+language:All&sort=stars&order=desc&type=Repositories');
//
//   axios
//     .get(encodedURI)
//     .then(function (response) {
//       console.log("**********************popular",response.data.items);
//       res.json({user: req.user, popular: response.data.items});
//     })
//     .catch(err => {
//       return err;
//     })
//
// });

function getProfile (username) {
	return axios.get('https://api.github.com/users/' + username + params)
		.then(function (user) {
			return user.data;
		});
}

function getRepos (username) {
	return axios.get('https://api.github.com/users/' + username + '/repos' + params +
		'&per_page=100')
}

function getStarCount (repos) {
	return repos.data.reduce(function(count, repo) {
		return count + repo.stargazers_count
	}, 0);
}

function handleError (error) {
	console.warn(error);
	return null;
}

function getUserData (player) {
	return axios.all([
		getProfile(player),
		getRepos(player)
	]).then(function(data) {
		var profile = data[0];
		var repos = data[1];

		return {
			profile: profile,
			score: calculateScore(profile, repos)
		}
	})
}

function sortPlayers (players) {
	return players.sort(function (a,b) {
		return b.score - a.score;
	});
}

module.exports = {
  battle: function(players) {
  	return axios.all(players.map(getUserData))
  		.then(sortPlayers)
  		.catch(handleError)

  },

  fetchPopularRepos: function (language) {
    var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

		response = axios
		 	.get(encodedURI)
			.then(function (response) {
        return response.data.items;
      })
			.catch(err => {
				return err;
			})

			return response
  }
};
