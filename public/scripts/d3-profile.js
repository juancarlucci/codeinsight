
$.ajax({
  method: "GET",
  url: "/api/user/profile",
  success: handleSuccess,
  error: handleError
});

var userProfile = [];
var userProfileNodes=[];

function handleSuccess(json) {
  userProfile = json.userProfile;
  // console.log(userProfile);

  var userHTML = createProfileHtml(userProfile);
  // console.log(userHTML);
  // var nodes = createD3nodes(userProfile);
  // var profileHtml = createProfileHtml(allRepos);

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
  $(".menu-items").append(userHTML);

  makeBadges(userProfileNodes[0]);

}

function handleError(e) {
  $(".message").text('Failed to load user repos, is the server working?');
}

// function createD3nodes(userProfile) {
//     console.log("userProfile",userProfile);
//
//
//     node.push({
//       id:userProfile.id,
//       name:userProfile.login,
//       owner_avatar:userProfile.avatar_url,
//       public_repos:userProfile.public_repos,
//       public_gists:userProfile.public_gists,
//       repos_url:userProfile.repos_url,
//       following:userProfile.following,
//       followers:userProfile.followers,
//       created_at:userProfile.created_at,
//       updated_at:userProfile.updated_at
//
//     });
// }



    function createProfileHtml(userProfile) {
      // console.log(userProfile);
      return `
        <p>
          <a href="${userProfile.repos_url}" target="_blank">
          ${userProfile.login}</a>
        </p>
        <p class="userProfile-repo-count">repos: ${userProfile.public_repos}</p>
        <p class="userProfile-repo-count">gists: ${userProfile.public_gists}</p>
        <p class="userProfile-repo-count">following: ${userProfile.following}</p>
        <p class="userProfile-repo-count">followers: ${userProfile.followers}</p>
        `;
    }

userRepoName = $('#repo-name').val();
console.log(userRepoName);
    // $.ajax({
    //   method: "GET",
    //   url: "/api/user/:repo/languages",
    //   success: handleLanguageSuccess,
    //   error: handleError
    // });
  $('form').on("submit", function(e){

    e.preventDefault();
    // var data = $(this).serialize();
    // console.log(data);
    // var reponame = "about";
    var reponame= $("input#repo-name").val();

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
      // var userHTML = createProfileHtml(userProfile);
      // console.log(userHTML);
      var repoLanguages = getRepoLanguages(repoLanguagesData);
      // var profileHtml = createProfileHtml(allRepos);


    }
    ///////////////////////////////////////////////////////////
    // BADGES

    function makeBadges(json){
      var margin = {top: 10, right: 20, bottom: 10, left: 10},
        width = 400 - margin.left - margin.right,
        height = 130 - margin.top - margin.bottom;

      var data=[];
      var badgesvg = d3.select(".badges")
          // .attr("width", 550)
          // .attr("height", 300)
          .append("div")
          .classed("svg-badge-container", true) //container class to make it responsive
          .attr("id", function(d, i) { return (i); })
          .append("svg")
          //responsive SVG needs these 2 attributes and no width and height attr
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 400 130")
          //class to make it responsive
          .classed("svg-content-responsive", true)



      for(elem in json){
        if(typeof json[elem] === "number")
        data.push({
          elem,
          data: json[elem]

        });
      }

      //FAKE DATA
      // data= [{
      //   elem: repos,
      //   data: 49,
      //   elem: gists,
      //   data: 4,
      //   elem: following,
      //   data: 2,
      //   elem: followers,
      //   data: 12}];
      // console.log("data",data);
      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var radiusScale = d3.scaleSqrt()
        .domain([0, 223])
        .range([1, 58])

      var elem = badgesvg.selectAll("g  circleText")
          .data(data)


      /*Create and place the "blocks" containing the circle and the text */
      var elemEnter = elem.enter()
        .append("g")
        .attr("class", "node-group")
        // .attr("transform", function(d){return `translate(200 ,100)`})
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      /*Create the circle for each block */
      var circleInner = elemEnter.append("circle")
        .attr("r", function(d) {
          return radiusScale(d.data)
        })
        .attr("stroke", "white")
        .attr("fill", "steelblue")
        // .attr("cx", function(d, i) { return i * 50 + 30; })
        .attr("cx", function(d, i) { return i * 80 + 50; })
        .attr("cy", 20)
        ;

        // Location of text for data values
        elemEnter.append("text")
          .text(function(d,i){return d.data})
          .attr("class", "badge-values")
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          // .attr("font-size", function(d, i) { return 5 + 5*i; })
          .attr("dx", function(d, i) { return i * 80 + 50; })
          // .attr("dy", function(d, i) { return 85 + 5*i; })
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


    //   console.log(userProfileNodes);
    // var format = d3.format(",d");
    //
    //
    // var side = 2 * radius * Math.cos(Math.PI / 4),
    //   dx = radius - side / 2;
    //
    // var badges = d3.select(".badges");
    //
    // var g = badges.append('g')
    //   .attr('transform', 'translate(' + [dx, dx] + ')');
    //
    // g.append("foreignObject")
    //   .attr("width", side)
    //   .attr("height", side)
    //   .append("xhtml:body")
    //   .html("Lorem ipsum dolor sit amet, ...");
      // .transition()
      //   .duration(2500)
      //   .on("start", function repeat() {
      //     d3.active(this)
      //         .tween("text", function() {
      //           var that = d3.select(this),
      //               i = d3.interpolateNumber(that.text().replace(/,/g, ""), Math.random() * 1e6);
      //           return function(t) { that.text(format(i(t))); };
      //         })
      //       .transition()
      //         .delay(1500)
      //         .on("start", repeat);
      //   });

    } //end makeBadges

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
  var  data3 = [
    {
      name:"vue",
      language: 'JavaScript',
      stargazers_count: 1,
      avatar_url: 'https://avatars1.githubusercontent.com/u/6128107?v=4',
      homepage: 'http://vuejs.org'
    },
    {
      name:"bootstrap",
      language: 'Python',
      stargazers_count: 13,
      avatar_url: 'https://avatars0.githubusercontent.com/u/2918581?v=4',
      homepage: 'http://getbootstrap.com'
    },
    {
      name:"reaJact",
      language: 'Python',
      stargazers_count: 31,
      avatar_url: 'https://avatars3.githubusercontent.com/u/69631?v=4',
    },
    {
    name:"javascript",
    language: 'JavaScript',
    stargazers_count: 36,
    avatar_url: 'https://avatars3.githubusercontent.com/u/698437?v=4'
    },
    {
      name:"eJava",
      language: 'C++',
      stargazers_count: 15
    },
    {
      name:"jquery",
      language: 'Python',
      stargazers_count: 43
    },
    {
      name:"lamda",
      language: 'Clojure',
      stargazers_count: 3
    }

  ];

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  // Set the dimensions of the canvas / graph
var margin3 = {top: 30, right: 20, bottom: 70, left: 50},
  width3 = 400 - margin3.left - margin3.right,
  height3 = 220 - margin3.top - margin3.bottom;

  // var svg3 = d3.select("#bar-chart2"),
  //   margin3 = {
  //     top: 20,
  //     right: 20,
  //     bottom: 30,
  //     left: 40
  //   },
  //   width3 = +svg2.attr("width") - margin3.left - margin3.right,
  //   height3 = +svg2.attr("height") - margin3.top - margin3.bottom;
  var chart1 = d3.select("#chartResponsive")
   .append("div")
   .classed("svg-container", true) //container class to make it responsive
   .attr("id", function(d, i) { return (i); })
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 400 200")
   //class to make it responsive
   .classed("svg-content-responsive", true)
   .append('g')
    .attr("transform", "translate(0," + margin3.top + ")");

//https://github.com/sanathp/D3js-Bar-Chart-with-delete-option/blob/master/barchart.html
    chart1
    .on( "click", function() {
      // need both of these to remove both the graph and the contaier
      this.parentNode.parentNode.remove();
      this.parentNode.parentNode.removeChild(this.parentNode);

    }
    )
    .append("text")
        .attr("x", width - 24)
        .attr("y", 19)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .attr("fill", "white")
        .attr("class", "del")
        .text("X")
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
    .text("lines of code")
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


  //   //LEGEND
  //   var legend1 = chart1.selectAll(".legend1")
  //     .data(repoLanguages)
  //   .enter().append("g")
  //     .attr("class", "legend1")
  //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  //
  // legend1.append("rect")
  //     .attr("x", width - 18)
  //     .attr("width", 18)
  //     .attr("height", 18)
  //     .style("fill", function(d, i) { return color(i); })
  //     .style("opacity", 0.8)
  //
  // legend1.append("text")
  //     .attr("x", width - 24)
  //     .attr("y", 9)
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "end")
  //     .attr("fill", "white")
  //     .attr("id", function(d, i) { return d+i; })
  //     .text(function(d) { return d.lang; });

} // end getRepoLanguages





///////////////////////////////////////////////////
//////////////LINE graph
//Inspired by https://bl.ocks.org/ocarneiro/a083012a5899c46390681352a549220d

var margin = {top: 30, right: 20, bottom: 90, left: 50},
  width = 400 - margin.left - margin.right,
  height = 220 - margin.top - margin.bottom;

var svg = d3.select("#lineChartResponsive")
    // .append("svg")
    //   .attr("width", 860)
    //   .attr("height", 200)
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
