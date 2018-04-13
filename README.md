# codeInsight

This is a project to display user’s github statistics in a way that can lead to insights about coding patterns and language usage.



[Story board, wireframes, and more details here](https://sketch.cloud/s/D44k2/all/welcome/basic-app/play)

## Process/approach:

Formulate purpose of app

Whiteboard basic concept

Use Sketch for wire-framing

Do basic usability testing



## DELIVERABLES

### Techonolgy Stack for codeInsight
Node.js/MongoDb/Express for the back-end

HTML/CSS/JavaScript for the front-end

Bonus level technologies: D3.js

### Audience:
A coder who has a github account with repos that wants a visual representation of his/her code.

### User Story:
User is able to create account and login to codeInsight.
The main page is an insights dashboard displaying publicly available information via Github’s API.
Information is displayed as graphs/charts representing major trends in the users own repo history.
User can navigate to What’s Hot page for statistics for all Github repos

### Technical milestones:
0. Create wireframes/prototypes for app. Create ERD.  Friday, April 6th.
1. Create basic routes, server, models for app in Node. Saturday, April 7th.
2. Create seed data. Saturday, April 7th.
3. Generate user login/auth. Sunday, April 8th.
4. Create API protocol. Test protocol. Sunday, April 8th.
5. Push to Heroku. Sunday, April 8th.
6. Begin front-end: basic HTML/CSS/SASS.
    Display basic data: languages, number of repos, etc. as per user story. Monday, April 9th.
7. Incorporate D3.js. Tuesday, April 10th.

## User story in detail:

### Sprint 1 - Home page and Insights Page
#### User can:
 1. Navigate to home page via “/“, this is the main page where user will have an opportunity to signup.
    * User sees name of the website and logo.
    * Links to "Log In" and "Sign Up".
2.  After signup for an account via OAuth user is taken to the insights page.
3. Behind the scenes an API call to github is automatically generated. It GETs data for the current user and uses that data to populate the insights page.
4. On successful request, user data is displayed graphically on the insights page.
5. User sees their own basic github information (name, city, and total number of repos).
6. User also sees other data as graphs. Possible areas to be graphed: coding languages, number of repos per language, lines of code per language, technology stacks per repo.
7. On home page user sees a link a to a page called What’s Hot.

#### Bonus features:
User sees github profile image next to their name.
Working signup and login features with Passport or Github OAuth.
User receives a welcome email after creating an account.

### Sprint 2 - Insights Page Graphical
#### User can:
1. Interact with graphical components (hover or click).
2. On hover graphical elements will display pertinent data. For example, while hovering over a bar graph of user languages the total number of repos for that language is displayed.

#### Bonus features:
User sees github profile image next to their name
User sees a color representation of hotness for the languages they know. This data is derived by stats of repos with most stars on github. For example, currently if the user knows React.js that language would be considered “hot” and be colored appropriately. Whereas, if they know Erlang, then the language would be “obscure” and be colored in a muted, “cold” color.

### Sprint 3 - What’s Hot Page
#### User can:
1. On home page user sees a link a to a page called What’s Hot.
2.  What’s Hot is a list of the technologies ranked by language.
3. Ranking includes repo stars, followers, and number of forks.

#### Bonus features:
A second API call is made, this time to LinkedIn or Glassdoor to get statistics on jobs by technology. This data is superimposed on the Github data to see correlations.


## Unsolved problems:




## Biggest wins and challenges:

[passport callback](https://www.evernote.com/l/ARxWA_O_P6pGrquz_4T5ycrV4OW_BJvzJyo)
![oauth with github](readme-assets/oauth.png "OAuth Github")

## Code Snippets

### Github OAuth

#### 1. Set up passport strategy

```
config/passport.js

passport.use(new GitHubStrategy({
  clientID      : process.env.GITHUB_CLIENT_ID,
  clientSecret  : process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "https://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
```

#### 2. Set up routes

Begin authentication. Tell passport to use github strategy.

```
server.js

app.get('/auth/github',
  passport.authenticate('github'));
```
After passport gets token from Github redirect flow to callback function.

```
server.js

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  ```
### Dev and Production Setup

```
export GITHUB_CLIENT_ID="32a8c37dfcdddd5b"
export GITHUB_CLIENT_SECRET="c86b44f3760c0a4ce320d3d365529733a9"
export EXPRESS_SESSION_SECRET="octopuseatsroundstones"
export MONGO_URI="mongodb://juancarlucci:octopuseatsroundstones@ds239009.mlab.com:39009/cosdeinsight-dev"
export CALLBACK_URL="http://localhost:3000/auth/github/callback"
```
### SVG

```
<svg version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 513 93.8" enable-background="new 0 0 513 93.8"
    xml:space="preserve">


<path id="heartBeat" fill="none" stroke="#F26522" stroke-width="3" d="M0,72.2c8.8-0.3,77.5-0.3,77.5-0.3c10.3-6,17.5-12.2,21.8-12.5c2.7-0.2,3.5,0.5,5.2,2.5
  c1.3,1.6,6.8,6.9,9,9c0.6,0.6,1.5,1,2.4,1h15.9c0.8,0,1.6,0.5,2,1.3c2.1,4.5,9.3,19.2,10.4,12.1c1.3-8.4,3-51.8,4-82.5
  c0.1-1.8,2.7-1.8,2.8,0l5.1,90c0.1,1.4,2,1.6,2.4,0.2l5.1-19.4c0.2-0.8,0.9-1.3,1.7-1.3l26-0.3c0,0,13.3-19,21.3-18.3
  c8,0.7,16,17.3,16,17.3s28,0,28,0c8.8-0.3,77.5-0.3,77.5-0.3c10.3-6,17.5-12.2,21.8-12.5c2.7-0.2,3.5,0.5,5.2,2.5
  c1.3,1.6,6.8,6.9,9,9c0.6,0.6,1.5,1,2.4,1h15.9c0.8,0,1.6,0.5,2,1.3c2.1,4.5,9.3,19.2,10.4,12.1c1.3-8.4,3-51.8,4-82.5
  c0.1-1.8,2.7-1.8,2.8,0l5.1,90c0.1,1.4,2,1.6,2.4,0.2l5.1-19.4c0.2-0.8,0.9-1.3,1.7-1.3l26-0.3c0,0,13.3-19,21.3-18.3
  s16,17.3,16,17.3h28"/>
</svg>
```
![heart beat svg](readme-assets/heartBeat.png "Heart Beat SVG")
### D3

#### Radius scale

```
var radiusScale = d3.scaleSqrt()
  .domain([8613, 123511])
  .range([2, 28])
```

#### Force Simulations

```
var simulation = d3.forceSimulation()
  .force("x", forceXJoin)
  .force("y", d3.forceY(height / 2).strength(0.05))
  //collide related to radius, so if r = 10, a force of 10 had edges touching
  .force("collide", forceCollide)
```
##### apply new forces

```
d3.select("#language").on("click", function() {
  simulation
    .force("x", forceXSeparate)
    //NOTE: needed to reset force simulation
    .alphaTarget(0.5)
    .restart()
})
```

```
var forceXSeparate = d3.forceX(function(d) {
  if (d.language === "Shell") {
    return (width / 4.8)
  } else if (d.language === "C" || d.language === "C++") {
    return (width / 3.4)
  } else if (d.language === "JavaScript") {
    return (width / 2.4)
  } else if (d.language === "Python") {
    return (width / 1.8)
  } else if (d.language === "Css") {
    return (width / 1.7)
  } else if (d.language === "Go") {
    return (width / 1.5)
  } else if (d.language === "Css") {
    return (width / 1.4)
  } else {
    return 780
  }
}).strength(0.5)
```
#### Search
```
function searchRepo() {
  //find the repo node
  var selectedVal = document.getElementById('search').value;
  var node = svg.selectAll(".node");
  var selected = node.filter(function(d, i) {
    return d.name != selectedVal;
  });
  selected.style("opacity", "0.3");

  d3.selectAll(".node").transition()
    .duration(5000)
    .style("opacity", 1);
  document.getElementById('search').value = '';
}
```
## Future Development

Incorporate LinkedIn or Glassdoor job trends to compare to repo popularity (Garima)
