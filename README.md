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

## Code Snippets

### Github OAuth

#### 1. Set up passport strategy

```
config/passport.js

passport.use(new GitHubStrategy({
  clientID: keys.githubClientID,
  clientSecret: keys.githubClientSecret,
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
