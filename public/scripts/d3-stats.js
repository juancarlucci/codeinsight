$(document).ready(function () {
  $.ajax({
    method: "GET",
    timeout: 2000,
    url: "/api/user/profile",
    success: handleSuccess,
    error: handleError
  });

  var userProfile = [];
  var userProfileNodes=[];

  function handleSuccess(json) {
    userProfile = json.userProfile;

    var userHTML = createProfileHtml(userProfile);

  userProfileNodes.push({
    name:userProfile.login,
    owner_avatar:userProfile.avatar_url,
    repos:userProfile.public_repos,
    gists:userProfile.public_gists,
    repos_url:userProfile.repos_url,
    following:userProfile.following,
    followers:userProfile.followers,
    created_at:userProfile.created_at,
    updated_at:userProfile.updated_at

  });
  $(".user-profile-items").append(userHTML);

  makeBadges(userProfileNodes[0]);

}

function handleError(e,ts) {
  if(ts==="timeout") {
        alert("Call has timed out"); //Handle the timeout
        } else {
  console.log('Failed to load user repos, is the server working?');


}

}

    function createProfileHtml(userProfile) {

      return `
        <div class="">
          <p class="userProfile-repo-count">repos</p>
          <h3 class="userProfile-repo-count user-stats">${userProfile.public_repos}</h3>
        </div>
        <div class="">
          <p class="userProfile-repo-count">gists</p>
          <h3 class="userProfile-repo-count user-stats">${userProfile.public_gists}</h3>
        </div>
        <div class="">
          <p class="userProfile-repo-count">following</p>
          <h3 class="userProfile-repo-count user-stats">${userProfile.following}</h3>
       </div>
       <div class="">
        <p class="userProfile-repo-count">followers</p>
        <h3 class="userProfile-repo-count user-stats">${userProfile.followers}</h3>
        </div>
        `;
    }
////////////////////////////////////////
// ALL REPOS DETAILS
////////////////////////////////////////
$.ajax({
  method: "GET",
  url: "/api/user/username/repos",
  timeout: 2000,
  success: handleAllReposSuccess,
  error: handleError
});

var userAllRepos = [];
var userAllReposNodes=[];

function handleAllReposSuccess(json) {
  userRepos = json.data;

  var userReposHTML = createAllReposHtml(userRepos);

  userRepos.map(function(repo) {
    // console.log("repo",repo);
    userAllReposNodes.push({
      name: repo.name,
      avatar: repo.owner.avatar_url,
      homepage: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks,
      created: repo.created_at,
      updated: repo.updated_at,
      size: repo.size
    })

  });

  $(".all-repos").append(userReposHTML);

} //end handleAllReposSuccess

function createAllReposHtml(repos) {
    return repos.map(getRepoHtml)
    .sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.created) - new Date(a.created);
    })
    .join("");
  }

function getRepoHtml(repo) {
  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

var newDate = new Date(repo.created_at);
var formattedDate = monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear();

    return `
    <article class="repo-info">
      <p class="repo-info-name" >${repo.name}</p>
    </article>
      `;
}


////////////////////////////////////////
// REPO BY LANGUAGE
////////////////////////////////////////

var currentRepoName =[];
$('form').on("submit", function(e){

    e.preventDefault();
    currentRepoName =[];
    var reponame = $("input#repo-name").val();
    currentRepoName.push(reponame);

    $.ajax({
      method: "GET",
      url: `/api/user/${reponame}/languages`,
      data: $(this).serialize(),
      success: handleLanguageSuccess,
      error: handleError
    });
    $("input#repo-name").val('');

  });

    var repoLanguages=[];
    function handleLanguageSuccess(json) {
      repoLanguagesData = json.data;

      var repoLanguages = getRepoLanguages(repoLanguagesData);

    }
    ///////////////////////////////////////////////////////////
    // BADGES BAR GRAPH
    /////////////////////////////////////////////////
    function makeBadges(json){
      var margin = {top: 10, right: 20, bottom: 10, left: 10},
        width = 400 - margin.left - margin.right,
        height = 130 - margin.top - margin.bottom;

      var data=[];

      var badgesvg = d3.select(".badges")
          .append("div")
          .classed("svg-badge-container", true)
          .attr("viewBox", "0 0 400 130")

      const initialRepoScaleData = [];
      for(elem in json){
        if(typeof json[elem] === "number"){
          data.push({
            elem,
            data: json[elem]
          });
          initialRepoScaleData.push(json.repos);
        }
      }
      const minDataPoint = d3.min(initialRepoScaleData);
      const maxDataPoint = d3.max(initialRepoScaleData);
      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var x = d3.scaleLinear()
        .domain([0, maxDataPoint])
        .range([0, 250]);

      var radiusScale = d3.scaleSqrt()
        .domain([0, maxDataPoint])
        .range([1, 48])

        badgesvg
          .selectAll("div")
            .data(data)
          .enter().append("div")
            .style('background-color', function(d) { return color(d.data); })
            .attr("class", "node-item")
            .style("width", 0)
            .text(function(d) { return d.elem; })
            .attr("text-anchor", "middle")
            .transition().duration(1500)
            .ease(d3.easeBack)
            .style("width", function(d) { return x(d.data) + "px"; })
            .attr("dx", function(d) { return x(d.data)/2 + "px"; })
            .attr("dy", -2)
            ;


      var elem = badgesvg.selectAll("g  circleText")
          .data(data)

        // Location of text for data values
        elemEnter.append("text")
          .text(function(d,i){return d.data})
          .attr("class", "badge-values")
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .attr("dx", function(d, i) { return i * 80 + 50; })
          .attr("dy", 105 - margin.top)
          ;

      // Location for title of elements
      elemEnter.append("text")
        .text(function(d,i){return d.elem})
        .attr("class", "badge-titles")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("dx", function(d, i) { return i * 80 + 50; })
        .attr("dy", 117 - margin.top)
        ;



    } //end makeBadges
    //////////////////////////////////////////////////////

    function getRepoLanguages(repo) {

    for(lang in repo){
      repoLanguages.push({
        lang:lang,
        lines: repo[lang]
      });
    }


function remove() {
  this.parentNode.parentNode.removeChild(this.parentNode);
}


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// BAR GRAPH REPO LANGUAGES
///////////////////////////////////////////////////////////

var color = d3.scaleOrdinal(d3.schemeCategory20);


  // Set the dimensions of the canvas / graph
var margin3 = {top: 30, right: 20, bottom: 70, left: 50},
  width3 = 667 - margin3.left - margin3.right,
  height3 = 375 - margin3.top - margin3.bottom;

  var chart1 = d3.select("#chartResponsive")
   .append("div")
   .classed("svg-container", true) //container class to make it responsive
   .attr("id", function(d, i) { return (i); })
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 667 375")
   .append('g')
    .attr("transform", "translate(0," + margin3.top + ")");

//https://github.com/sanathp/D3js-Bar-Chart-with-delete-option/blob/master/barchart.html
    chart1
    .append("text")
        .attr("x", width - 24)
        .attr("y", 19)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .attr("fill", "white")
        .attr("class", "del")
        .text("X")
        .on( "click", function() {
          // need both of these to remove both the graph and the container
          this.parentNode.parentNode.remove();
          // this.parentNode.parentNode.removeChild();
          this.parentNode.parentNode.removeChild(this.parentNode);
        }
        )
        ;



  var x = d3.scaleBand().rangeRound([0, width3]).padding(0.4),
    y = d3.scaleLinear().rangeRound([height3, 0]);

  var g = chart1.append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

  x.domain(repoLanguages.map(function(d) {
    return d.lang;
  }));
  y.domain([0, d3.max(repoLanguages, function(d) {
    return d.lines;
  })]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height3 + ")")
    .call(d3.axisBottom(x))
    .attr("class", "axisColor slantedAxis")


  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(7, "s"))
    .attr("class", "axisColor")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("bytes of code")
    .attr("fill", "white")

    g.append("text")
           .attr("x", (width / 2))
           .attr("y", 0 - (margin.top / 2))
           .attr("text-anchor", "middle")
           .style("font-size", "16px")
           .text(`${currentRepoName}`)
           .attr("fill", "white")

  g.selectAll(".bar")
    .data(repoLanguages)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.lang);
    })
    .attr("fill", function(d) { return color(d.lang); })
    .attr("y", height3)
    .transition().duration(1500)
    .ease(d3.easeExp)
    .attr("y", function(d) {
      return y(d.lines);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      return height3 - y(d.lines);
    });


} // end getRepoLanguages

///////////////////////////////////////////////////
//////////////LINE graph
//Inspired by https://bl.ocks.org/ocarneiro/a083012a5899c46390681352a549220d

var margin = {top: 30, right: 20, bottom: 90, left: 50},
  width = 400 - margin.left - margin.right,
  height = 220 - margin.top - margin.bottom;

var svg = d3.select("#lineChartResponsive")
      .append("div")
         .classed("svg-line-container", true) //container class to make it responsive
         .append("svg")
         //responsive SVG needs these 2 attributes and no width and height attr
         .attr("preserveAspectRatio", "xMinYMin meet")
         .attr("viewBox", "0 0 400 200")
         //class to make it responsive
         .classed("svg-content-responsive", true)
         .attr("id", "first-line")
         .append('g')
          .attr("transform", "translate(0," + margin.top + ")");


    var data = [{"name": "javascript", "date":"04/04/2018", "JS": 25, "PY": 60, "C": 10, "JV": 2},
                {"name": "python","date":"04/03/2018", "JS": 50, "PY": 80, "C": 20, "JV": 1},
                {"name": "c","date":"04/02/2018", "JS": 31, "PY": 70, "C": 10, "JV": 20},
                {"name": "java","date":"04/01/2018", "JS": 4, "PY": 3, "C": 6, "JV": 10}

               ]

    var x = d3.scaleTime()
    	.rangeRound([0, width]);
    var x_axis = d3.axisBottom(x);

    var y = d3.scaleLinear()
    	.rangeRound([height, 0]);
    var y_axis = d3.axisBottom(y);

    var parseTime = d3.timeParse("%d/%m/%Y");

    x.domain(d3.extent(data, function(d) { return parseTime(d.date); }));
  	y.domain([0,
              d3.max(data, function(d) {
                return d3.max([d.JS, d.PY, d.C, d.JV]);
              })]);

    var multiline = function(category) {
      //https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
      var line = d3.line()
                  .x(function(d) { return x(parseTime(d.date)); })
                  .y(function(d) { return y(d[category]); })
                  //https://github.com/d3/d3-shape#line_curve
                  .curve(d3.curveNatural);
      return line;
    }

    var line = d3.line()
      .x(function(d) { return x(parseTime(d.date)); })
      .y(function(d) { return y(d); });

    var categories = ['JS', 'PY', 'C', 'JV'];

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var g = svg.append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    for (i in categories) {
      var lineFunction = multiline(categories[i]);
      g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("stroke-width", 2)
        .style("stroke",  color(i))
        .attr("d", lineFunction);


      // Add the X Axis
  		g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(7))
      .attr("class", "axisColor slantedAxis")
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");


      // Add the Y Axis
  		g.append("g")
      .call(d3.axisLeft(y))
      .attr("class", "axisColor");

      //LEGEND
      var legend = svg.selectAll(".legend")
        .data(categories)
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return color(i); })
        .style("opacity", 0.8)

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .attr("fill", "white")
        .attr("id", "first-line-legend")
        .text(function(d) { return d; });
} //end forin categories


});//end documentREAdy
