
// $.ajax({
//   method: "GET",
//   url: "/api/user/profile",
//   success: handleSuccess,
//   error: handleError
// });

var userProfile = [];
var node=[];

function handleSuccess(json) {
  userProfile = json.userProfile;
  // console.log(userProfile);

  var userHTML = createProfileHtml(userProfile);
  // console.log(userHTML);
  // var nodes = createD3nodes(userProfile);
  // var profileHtml = createProfileHtml(allRepos);

  node.push({
    id:userProfile.id,
    name:userProfile.login,
    owner_avatar:userProfile.avatar_url,
    public_repos:userProfile.public_repos,
    public_gists:userProfile.public_gists,
    repos_url:userProfile.repos_url,
    following:userProfile.following,
    followers:userProfile.followers,
    created_at:userProfile.created_at,
    updated_at:userProfile.updated_at

  });
  $(".menu-items").append(userHTML);

}

function handleError(e) {
  $("#popular-list").text('Failed to load user repos, is the server working?');
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

//////////////LINE graph
//Inspired by https://bl.ocks.org/ocarneiro/a083012a5899c46390681352a549220d

var margin = {top: 30, right: 20, bottom: 90, left: 50},
  width = 400 - margin.left - margin.right,
  height = 220 - margin.top - margin.bottom;

var svg = d3.select("#chartResponsive")
    // .append("svg")
    //   .attr("width", 860)
    //   .attr("height", 200)
      .append("div")
         .classed("svg-container", true) //container class to make it responsive
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
}
// //////////////LINE graph2/////////////////////////////////
//
//
// var svg4 = d3.select("#profile-layout2").append("svg")
//       .attr("width", 860)
//       .attr("height", 200)
//
//     var margin = {left:30, right:30, top: 10, bottom: 20}
//     var width = svg.attr("width") - margin.left - margin.right;
//     var height = svg.attr("height") - margin.bottom - margin.top;
//
//
//     var data4 = [{"name": "javascript", "date":"04/04/2018", "JS": 25, "PY": 60, "C": 10, "JV": 42},
//                 {"name": "python","date":"04/03/2018", "JS": 20, "PY": 30, "C": 50, "JV": 61},
//                 {"name": "c","date":"04/02/2018", "JS": 31, "PY": 30, "C": 10, "JV": 30},
//                 {"name": "java","date":"04/01/2018", "JS": 4, "PY": 3, "C": 24, "JV": 63}
//
//                ]
//
//     var x = d3.scaleTime()
//     	.rangeRound([0, width]);
//     var x_axis = d3.axisBottom(x);
//
//     var y = d3.scaleLinear()
//     	.rangeRound([height, 0]);
//     var y_axis = d3.axisBottom(y);
//
//     var parseTime = d3.timeParse("%d/%m/%Y");
//
//     x.domain(d3.extent(data4, function(d) { return parseTime(d.date); }));
//   	y.domain([0,
//               d3.max(data4, function(d) {
//                 return d3.max([d.JS, d.PY, d.C, d.JV]);
//               })]);
//
//     var multiline = function(category) {
//       var line = d3.line()
//                   .x(function(d) { return x(parseTime(d.date)); })
//                   .y(function(d) { return y(d[category]); })
//                   .curve(d3.curveMonotoneX);;
//       return line;
//     }
//
//     var line = d3.line()
//       .x(function(d) { return x(parseTime(d.date)); })
//       .y(function(d) { return y(d); });
//
//     var categories = ['JS', 'PY', 'C', 'JV'];
//
//     var color = d3.scaleOrdinal(d3.schemeCategory10);
//
//     var g = svg4.append("g")
//         .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
//
//     for (i in categories) {
//       var lineFunction = multiline(categories[i]);
//       g.append("path")
//         .datum(data4)
//         .attr("class", "line")
//         .style("stroke",  color(i))
//         .attr("d", lineFunction);
//
//
//       // Add the X Axis
//   		g.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x))
//       .attr("class", "axisColor");
//
//       // Add the Y Axis
//   		g.append("g")
//       .call(d3.axisLeft(y))
//       .attr("class", "axisColor");
//
//       //LEGEND
//       var legend2 = svg.selectAll(".legend")
//         .data(categories)
//       .enter().append("g")
//         .attr("class", "legend")
//         .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//     legend2.append("rect")
//         .attr("x", width - 18)
//         .attr("width", 18)
//         .attr("height", 18)
//         .style("fill", function(d, i) { return color(i); })
//
//     legend2.append("text")
//         .attr("x", width - 24)
//         .attr("y", 9)
//         .attr("dy", ".35em")
//         .style("text-anchor", "end")
//         .text(function(d) { return d; });
// }
//
//
//
// //////////////////////////////////////////////////
// ////////////////BAR CHART/////////////////////////
// ///////////////////////////////////////////////////
// ///FAKE TEST DATA
// var  data2 = [
//   {
//     name:"vue",
//     language: 'JavaScript',
//     stargazers_count: 15,
//     avatar_url: 'https://avatars1.githubusercontent.com/u/6128107?v=4',
//     homepage: 'http://vuejs.org'
//   },
//   {
//     name:"bootstrap",
//     language: 'Python',
//     stargazers_count: 3,
//     avatar_url: 'https://avatars0.githubusercontent.com/u/2918581?v=4',
//     homepage: 'http://getbootstrap.com'
//   },
//   {
//     name:"reaJact",
//     language: 'Java',
//     stargazers_count: 1,
//     avatar_url: 'https://avatars3.githubusercontent.com/u/69631?v=4',
//   },
//   {
//   name:"javascript",
//   language: 'JavaScript',
//   stargazers_count: 6,
//   avatar_url: 'https://avatars3.githubusercontent.com/u/698437?v=4'
//   },
//   {
//     name:"eJava",
//     language: 'Java',
//     stargazers_count: 5
//   },
//   {
//     name:"jquery",
//     language: 'Python',
//     stargazers_count: 3
//   },
//   {
//     name:"lamda",
//     language: 'Lisp',
//     stargazers_count: 13
//   }
//
// ];
//
// var color = d3.scaleOrdinal(d3.schemeCategory20);
//
// var svg2 = d3.select("#bar-chart"),
//   margin2 = {
//     top: 20,
//     right: 20,
//     bottom: 30,
//     left: 40
//   },
//   width2 = +svg2.attr("width") - margin2.left - margin2.right,
//   height2 = +svg2.attr("height") - margin2.top - margin2.bottom;
//
// var x = d3.scaleBand().rangeRound([0, width2]).padding(0.4),
//   y = d3.scaleLinear().rangeRound([height2, 0]);
//
// var g = svg2.append("g")
//   .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
//
// // var data = d3.csvParse(csv, function(d) {
// //   d.stargazers_count = +d.stargazers_count;
// //   return d;
// // })
//
// x.domain(data2.map(function(d) {
//   return d.language;
// }));
// y.domain([0, d3.max(data2, function(d) {
//   return d.stargazers_count;
// })]);
//
// g.append("g")
//   .attr("class", "axis axis--x")
//   .attr("transform", "translate(0," + height2 + ")")
//   .call(d3.axisBottom(x))
//   .attr("class", "axisColor")
//
// g.append("g")
//   .attr("class", "axis axis--y")
//   .call(d3.axisLeft(y).ticks(12, "s"))
//   .attr("class", "axisColor")
//   .append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("y", 6)
//   .attr("dy", "0.71em")
//   .attr("text-anchor", "end")
//   .text("repos")
//   .attr("fill", "white")
//
// g.selectAll(".bar")
//   .data(data2)
//   .enter().append("rect")
//   .attr("class", "bar")
//   .attr("x", function(d) {
//     return x(d.language);
//   })
//   .attr("fill", function(d) { return color(d.language); })
//   .attr("y", height2)
//   .transition().duration(1500)
//   .ease(d3.easeExp)
//   .attr("y", function(d) {
//     return y(d.stargazers_count);
//   })
//   .attr("width", x.bandwidth())
//   .attr("height", function(d) {
//     return height2 - y(d.stargazers_count);
//   });


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
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 400 200")
   //class to make it responsive
   .classed("svg-content-responsive", true)
   .attr("id", "first")
   .append('g')
    .attr("transform", "translate(0," + margin3.top + ")");


  var x = d3.scaleBand().rangeRound([0, width3]).padding(0.4),
    y = d3.scaleLinear().rangeRound([height3, 0]);

  var g = chart1.append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

  // var data = d3.csvParse(csv, function(d) {
  //   d.stargazers_count = +d.stargazers_count;
  //   return d;
  // })

  x.domain(data3.map(function(d) {
    return d.language;
  }));
  y.domain([0, d3.max(data3, function(d) {
    return d.stargazers_count;
  })]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height3 + ")")
    .call(d3.axisBottom(x))
    .attr("class", "axisColor slantedAxis")

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(12, "s"))
    .attr("class", "axisColor")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("percent growth")
    .attr("fill", "white")

  g.selectAll(".bar")
    .data(data3)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.language);
    })
    .attr("fill", function(d) { return color(d.language); })
    .attr("y", height3)
    .transition().duration(1500)
    .ease(d3.easeExp)
    .attr("y", function(d) {
      return y(d.stargazers_count);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
      return height3 - y(d.stargazers_count);
    });
