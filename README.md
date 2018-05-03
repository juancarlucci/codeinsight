# codeInsight

This is a project to display user’s github statistics in a way that can lead to insights about coding patterns and language usage.

![codeInsight-login](readme-assets/login.png "Popular Repos Image")
![codeInsight](readme-assets/hot.png "Popular Repos Image")


[Sketch: Story board, wireframes, and more details](https://sketch.cloud/s/D44k2/all/welcome/basic-app/play)

[Heroku Deployed App](https://codeinsight.herokuapp.com/)

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
8. Incorporate force layout graph in D3, April 11th.

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

User sees a color representation of hotness for the languages they know. This data is derived by stats of repos with most stars on github. For example, currently if the user knows React.js that language would be considered “hot” and be colored appropriately. Whereas, if they know Erlang, then the language would be “obscure” and be colored in a muted, “cold” color.

### Sprint 3 - What’s Hot Page
#### User can:
1. On home page user sees a link a to a page called What’s Hot.
2. What’s Hot is a list of the technologies ranked by language.
3. Ranking is by repo stars.

#### Bonus features:
A second API call is made, this time to LinkedIn or Glassdoor to get statistics on jobs by technology. This data is superimposed on the Github data to see correlations.


## Biggest wins and challenges:

[passport callback](https://www.evernote.com/l/ARxWA_O_P6pGrquz_4T5ycrV4OW_BJvzJyo)
Debugging express-session cookie that caused what seemed like a bug that would log user out after interacting with the graphs. After looking at the documentation and asking for guidance found an issue with how long the cookies were set to expire. On updating cookie expiration, the bug was fixed.

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
export GITHUB_CLIENT_ID="32***"
export GITHUB_CLIENT_SECRET="c86***"
export EXPRESS_SESSION_SECRET="***"
export MONGO_URI="mongodb://user***:password***@ds239009.mlab.com:39009/cosdeinsight-dev"
export CALLBACK_URL="http://localhost:3000/auth/github/callback"
```
### SVG

Created SVG using Adobe Illustrator.
Added animation to SVG with CSS.
```
<svg version="1.1" id="logo" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
	 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 260.3 260.3"
	 style="enable-background:new 0 0 260.3 260.3;" xml:space="preserve">

	 <g i:extraneous="self">
 		<circle fill="white" stroke="steelblue" id="outer-circle" class="st0" cx="130.2" cy="130.2" r="129.7"/>
 		<polyline fill="none"  stroke="steelblue" id="logo-link" class="logo-link" points="104.4,79.6 180,60.1 205.3,120.4 146.9,152.5 63.8,146.2 110.8,192
 			160.4,210.9 147.9,158.5 		"/>
 		<circle fill="white"  stroke="steelblue" id="circle7" class="circle-thick" cx="160.4" cy="210.9" r="21.9"/>
 		<circle fill="white"  stroke="steelblue" id="circle6" class="circle-thin" cx="110.8" cy="192" r="13.5"/>
 		<circle fill="white"  stroke="steelblue" id="circle5" class="circle-thin" cx="63.8" cy="146.2" r="25.8"/>
 		<circle fill="white"  stroke="steelblue" id="circle4" class="circle-red" cx="146.9" cy="152.5" r="13.5"/>
 		<circle fill="white"  stroke="steelblue" id="circle3" class="circle-thick" cx="205.3" cy="120.4" r="18.5"/>
 		<circle fill="white"  stroke="steelblue" id="circle2" class="circle-thin" cx="180" cy="60.1" r="19.6"/>
 		<circle fill="white"  stroke="steelblue" id="circle1" class="circle-thick" cx="104.4" cy="79.6" r="37"/>
 	</g>
</svg>
```
![heart beat svg](readme-assets/logo.png "Heart Beat SVG")


### D3

#### Radius scale

Setup scale to display data with proportionality.

```
const minDataPoint = d3.min(initialRepoScaleData);
const maxDataPoint = d3.max(initialRepoScaleData);

var radiusScale = d3.scaleSqrt()
  .domain([0, maxDataPoint])
  .range([1, 48])
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
