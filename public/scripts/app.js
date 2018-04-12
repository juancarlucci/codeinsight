console.log("Sanity insanitum: JS is working!");
$(document).ready(function() {
///FAKE TEST DATA
// var  repos = [
//   {
//     name:"vue",
//     language: 'JavaScript',
//     stargazers_count: 90163,
//     avatar_url: 'https://avatars1.githubusercontent.com/u/6128107?v=4',
//     homepage: 'http://vuejs.org'
//   },
//   {
//     name:"bootstrap",
//     language: 'Python',
//     stargazers_count: 123511,
//     avatar_url: 'https://avatars0.githubusercontent.com/u/2918581?v=4',
//     homepage: 'http://getbootstrap.com'
//   },
//   {
//     name:"reaJact",
//     language: 'Java',
//     stargazers_count: 93126,
//     avatar_url: 'https://avatars3.githubusercontent.com/u/69631?v=4',
//   },
//   {
//   name:"javascript",
//   language: 'JavaScript',
//   stargazers_count: 69186,
//   avatar_url: 'https://avatars3.githubusercontent.com/u/698437?v=4'
//   },
//   {
//     name:"eJava",
//     language: 'Java',
//     stargazers_count: 52765
//   },
//   {
//     name:"jquery",
//     language: 'Python',
//     stargazers_count: 48613
//   },
//   {
//     name:"lamda",
//     language: 'Lisp',
//     stargazers_count: 8613
//   }
//
// ];


var $popularList;
var allRepos = [];
var nodes = [];


//populate adter ready
$popularList = $("#popular-list");
//index route
  $.ajax({
    method: "GET",
    // url: "/api/repos/all",
    url: "/api/repos/popular",
    success: handleSuccess,
    error: handleError
});

///TEST Trigger ////////
// handleSuccess(repos);

////////////////////////

function handleSuccess(json) {
allRepos = json.popular;
// allReposFake = json;
// console.log(allRepos);
// pass `allRepos` into the template function
// var reposHtml = getAllReposHtml(allRepos);
var reposHtml = getAllReposHtml(allRepos);
// changeStyle(reposHtml);
// append html to the view
$popularList.append(reposHtml);
// allRepos.push(reposHtml);
// console.log(allRepos);
var newNodes = createD3nodes(allRepos);
// nodes.push(newNodes);
// console.log('newNodes: \n',newNodes);
}

function handleError(e) {
  $("#popular-list").text('Failed to load popular repos, is the server working?');
}

// function getRepoHtml(repo) {
//   console.log(repo.name);
//   return `<hr>
//       <p>
//         <b class="repo-name">${repo.name}</b>
//         <span class="view-input" style="display: none">
//           <input type="text" value="${repo.name}" />
//           </span>
//           <p>
//             ${repo.name}
//           </p>
//           <button class="viewRepoBtn">View</button>
//         stars ${repo.stargazers_count}
//         <br>
//         </p>
//       `;
// }

function changeStyle(reposHtml) {
  // var $repoItemsNodeArray = document.getElementsByClassName("repo-item");
  var list = document.getElementsByClassName("repo-item");
    // console.log($repoItemsNodeArray[0]);
//   for (var i =0 ; i<$repoItemsNodeArray.length; i++){
//   console.log($repoItemsNodeArray);
// }
for (var item of reposHtml) {
    // console.log(item.dataset);
 }

  // if (.dataset. === "red"){
  //   document.getElementById("myDiv").style.color = "yellow";
  // } else {
  //   document.getElementById("myDiv").style.color = "red";
  // }
}
// function addClass() {
//     document.getElementById("myDiv").classList.add("mystyle");
// }
// function removeClass() {
//     document.getElementById("myDiv").classList.remove("mystyle");
// }

function getRepoHtml(repo) {

  // console.log(repo.name);
  return `<hr>
          <p class="repo-item" data-stars=${repo.stargazers_count}>
            <a href="${repo.homepage}" target="_blank">
            <img class="repo-image" src="${repo.owner.avatar_url}" alt="repo image">
            <b class="repo-name">${repo.name}</b>
            <b class="repo-stargazers_count">${repo.stargazers_count}</b>
            <b class="repo-language">${repo.language}</b>
            </a>
          </p>

      `;
}

function getAllReposHtml(repos) {
  // repos = changeStyle(repos)
  return repos.map(getRepoHtml).join("");
}

//the secodn arg, '.viewRepoBtn' is event delegation
// $popularList.on('click', '.viewRepoBtn', function() {
// console.log('clicked viewRepo button to', '/api/repo/'+$(this).attr('data-id'));
// // $.ajax({
// //   method: 'GET',
// //   url: '/api/repo/'+$(this).attr('data-id'),
// //   success: viewRepoSuccess,
// //   error: viewRepoError
// // });
// });
// //function to repopulate
// function viewRepoSuccess(repo) {
//   //hide
//   $('#content').hide('3000',function(){
//     //after hide
//   $('#content').empty();
//
//   $('#content').append( getRepoViewHtml(repo));
//   $('#content').show('1000');
// });
// }
// function viewRepoError(err) {
//   console.log("view success",err);
// }

//////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////
///////////D3////////////////


//
// /////////////DATA////////////
// var data =[
// {id: 2126244, name: "bootstrap", owner_avatar: "https://avatars0.githubusercontent.com/u/2918581?v=4", homepage: "http://getbootstrap.com", language: "CSS"},
// {id: 45717250, name: "tensorflow", owner_avatar: "https://avatars1.githubusercontent.com/u/15658638?v=4", homepage: "https://tensorflow.org", language: "C++"},
// {id: 10270250, name: "react", owner_avatar: "https://avatars3.githubusercontent.com/u/69631?v=4", homepage: "https://reactjs.org", language: "JavaScript"},
// {id: 11730342, name: "vue", owner_avatar: "https://avatars1.githubusercontent.com/u/6128107?v=4", homepage: "http://vuejs.org", language: "JavaScript"},
// {id: 21737465, name: "awesome", owner_avatar: "https://avatars1.githubusercontent.com/u/170270?v=4", homepage: "", language: null},
// {id: 943149, name: "d3", owner_avatar: "https://avatars1.githubusercontent.com/u/1562726?v=4", homepage: "https://d3js.org", language: "JavaScript"},
// {id: 6498492, name: "javascript", owner_avatar: "https://avatars3.githubusercontent.com/u/698437?v=4", homepage: null, language: "JavaScript"},
// {id: 29028775, name: "react-native", owner_avatar: "https://avatars3.githubusercontent.com/u/69631?v=4", homepage: "http://facebook.github.io/react-native/", language: "JavaScript"},
// {id: 9384267, name: "electron", owner_avatar: "https://avatars1.githubusercontent.com/u/13409222?v=4", homepage: "https://electronjs.org", language: "C++"},
// {id: 460078, name: "angular.js", owner_avatar: "https://avatars3.githubusercontent.com/u/139426?v=4", homepage: "https://angularjs.org", language: "JavaScript"},
// {id: 2325298, name: "linux", owner_avatar: "https://avatars0.githubusercontent.com/u/1024025?v=4", homepage: "", language: "C"},
// {id: 3470471, name: "Font-Awesome", owner_avatar: "https://avatars0.githubusercontent.com/u/1505683?v=4", homepage: "https://fontawesome.com", language: "CSS"},
// {id: 2561582, name: "animate.css", owner_avatar: "https://avatars3.githubusercontent.com/u/439365?v=4", homepage: "http://daneden.github.io/animate.css", language: "CSS"},
// {id: 167174, name: "jquery", owner_avatar: "https://avatars1.githubusercontent.com/u/70142?v=4", homepage: "https://jquery.com/", language: "JavaScript"},
// {id: 7691631, name: "moby", owner_avatar: "https://avatars1.githubusercontent.com/u/27259197?v=4", homepage: "https://mobyproject.org/", language: "Go"},
// {id: 21289110, name: "awesome-python", owner_avatar: "https://avatars2.githubusercontent.com/u/652070?v=4", homepage: "https://awesome-python.com/", language: "Python"}
// ]
//
// // var data = [
// // var  nodes = [
// //   {
// //     name:"vue",
// //     language: 'JavaScript',
// //     stars: 90163,
// //     avatar_url: 'https://avatars1.githubusercontent.com/u/6128107?v=4'
// //   },
// //   {
// //     name:"bootstrap",
// //     language: 'Python',
// //     stars: 123511,
// //     avatar_url: 'https://avatars0.githubusercontent.com/u/2918581?v=4',
// //   },
// //   {
// //     name:"reaJact",
// //     language: 'Java',
// //     stars: 93126,
// //     avatar_url: 'https://avatars3.githubusercontent.com/u/69631?v=4',
// //   },
// //   {
// //   name:"javascript",
// //   language: 'JavaScript',
// //   stars: 69186,
// //   avatar_url: 'https://avatars3.githubusercontent.com/u/698437?v=4'
// //   },
// //   {
// //     name:"eJava",
// //     language: 'Java',
// //     stars: 52765
// //   },
// //   {
// //     name:"jquery",
// //     language: 'Python',
// //     stars: 48613
// //   },
// //   {
// //     name:"lamda",
// //     language: 'Lisp',
// //     stars: 8613
// //   }
// //
// // ];
//
function createD3nodes(data){

  data = data.map(function(repo) {


    return {
      id:repo.id,
      name: repo.name,
      owner_avatar: repo.owner.avatar_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count,
      forks_count: repo.forks,
      created_at: repo.created_at,
      updated_at: repo.updated_at

    }
  });
  // console.log(data);
}
//
//
//
//
// // var color = d3.scaleOrdinal(d3.schemeCategory20);
// var color = d3.scaleLinear()
//     .domain([10, 100])
//     .range(["brown", "steelblue"]);
//
// var width = 840,
//   height = 680;
//
// // Define the div for the tooltip
// var div = d3.select("body").append("div")
//   .attr("class", "tooltip")
//   .style("opacity", 0);
//
// var svg = d3.select("#stars-layout")
// .append("svg")
// .attr("height", height)
// .attr("width", width)
// .append("g")
// .attr("transform", "translate(0,0)")
//
// // var defs = svg.append("defs");
// //
// // defs.append("pattern")
// //   .attr("id", "avatar")
// //   .attr("height", "100%")
// //   .attr("width", "100%")
// //   .attr("patternContentUnits", "objectBoundingBox")
// //   .append("image")
// //   .attr("height", "1")
// //   .attr("width", "1")
// //   .attr("preserveAspectRatio", "none")
// //   .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
// //   .attr("xlink:href", data.avatar_url)
//
//
//
// //RADIUS scale
// var radiusScale = d3.scaleSqrt()
// .domain([8613, 123511])
// .range([10,70])
// //FORCE SiMULATION
// // a collection of forces to apply to circles
//
// //NESTED CIRCLES///////////////
// // var simulation = d3.forceSimulation()
// //   .force("x", d3.forceX(width / 2).strength(0.05))
// //   .force("y", d3.forceY(height / 2).strength(0.05))
// //   //related to redius, so if r = 10, a force of 10 had edges touching
// //   .force("collide", d3.forceCollide(function(d){
// //     return radiusScale(d.stars)+3
// //   }))
//
// //REGULAR Circles
// var forceXSeparate = d3.forceX(function(d){
//   if(d.language === "JavaScript"){
//   return (width / 2)
// } else {
//   return 750
// }
// }).strength(0.5)
//
// var forceXJoin = d3.forceX(width / 2).strength(0.05)
//
// var forceCollide = d3.forceCollide(function(d){
//   return radiusScale(d.stars) + 3
// })
//
// // var forceXconcentric = d3.forceY(width / 2).strength(0.05)
// // var concentric = circles.attr("cx", 30).attr("cy", 30)
//
//
// //a collection of forces to apply to circles
// var simulation = d3.forceSimulation()
//   .force("x", forceXJoin)
//   .force("y", d3.forceY(height / 2).strength(0.05))
//   //collide related to radius, so if r = 10, a force of 10 had edges touching
//   .force("collide", forceCollide)
//
//   // d3.csv("stars.csv", function(error, data) {
//   //   if (error) throw error;
//
//   // d3.queue()
//   //   .defer(d3.csv, "stars.csv")
//   //   .await(ready)
//
// // function ready(error, data) {
//
//
// // defs.selectAll(".avatar-pattern")
// //   .data(data)
// //   .enter().append("pattern")
// //   .attr("class", "avatar-pattern")
// //   .attr("id", function(d){
// //     return d.name
// //   })
// //   .attr("height", "100%")
// //   .attr("width", "100%")
// //   .attr("patternContentUnits", "objectBoundingBox")
// //   .append("image")
// //   .attr("height", "1")
// //   .attr("width", "1")
// //   .attr("preserveAspectRatio", "none")
// //   .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
// //   .attr("xlink:href", function(d){
// //     return d.avatar_url
// //   });
//
//   // var circles = svg.selectAll(".repo")
//   //   .data(data)
//   //   .enter().append("circle")
//   //   .attr("class", "repo")
//     // .attr("r", function(d){
//     //   return radiusScale(d.stars)
//     // })
//   //   // .attr("fill", function(d){
//   //   //   return "url(#" + d.avatar_url +")"
//   //   // })
//   //   // .attr("fill", "red")
//   //   .attr("fill", function(d) { return color(d.language); })
//   //   .on("click", function(d){
//   //     console.log(d.name, d.stars)
//   //   })
//   //   .on("mouseover", function(d) {
//   //       div.transition()
//   //           .duration(200)
//   //           .style("opacity", .9);
//   //       div.html("<div><span>Repo:</span> <span>" + d.name + "</span></div>" + "<div><span>Stars:</span> <span>" + d.stars + "</span></div>")
//   //           .style("left", (d3.event.pageX - 50) + "px")
//   //           .style("top", (d3.event.pageY - 50) + "px");
//   //       })
//   //   .on("mouseout", function(d) {
//   //       div.transition()
//   //           .duration(500)
//   //           .style("opacity", 0);
//   //   });
//
//     // circles.append("text")
//     // .attr("dx", 10)
//     // .attr("dy", ".35em")
//     // .text(function(d) { return d.name })
//     // .style("stroke", "gray");
//
//
//
// d3.select("#language").on("click", function(){
// simulation
//   .force("x", forceXSeparate)
//   //NOTE: needed to reset force simulation
//   .alphaTarget(0.5)
//   .restart()
// })
//
// d3.select("#all").on("click", function(){
// simulation
//   .force("x", forceXJoin)
//   .alphaTarget(.5)
//   .restart()
// })
//
// // d3.select("#concentric").on("click", function(){
// //   circles
// //     .attr("cx", 30)
// //     .attr("cy", 30)
// // })
//
//
// // d3.select("#concentric").on("click", function(){
// //   simulation
// //     .force("x", forceXconcentric)
// //     .alphaTarget(.5)
// //     .restart()
// //
// // })
//
// var node = svg.selectAll("circle.node")
//    .data(data)
//    .enter().append("g")
//    .attr("class", "node")
//
//
//    //MOUSEOVER
//    .on("mouseover", function(d,i) {
//      if (i>0) {
//        //CIRCLE
//        d3.select(this).selectAll("circle")
//        .transition()
//        .duration(250)
//        .style("cursor", "none")
//        .attr("r", function(d){
//          return radiusScale(d.stars)
//        })
//        .attr("fill",function(d) { return color(d.language); })
//
//        //TEXT
//        d3.select(this).select("text")
//        .transition()
//        .style("cursor", "none")
//        .duration(250)
//        .style("cursor", "none")
//        .attr("font-size","1.5em")
//        .attr({
//          "alignment-baseline": "middle",
//          "text-anchor" : "middle"
//              })
//        .attr("x", 15 )
//        .attr("y", 5 )
//      } else {
//        //CIRCLE
//        d3.select(this).selectAll("circle")
//        .style("cursor", "none")
//
//        //TEXT
//        d3.select(this).select("text")
//        .style("cursor", "none")
//      }
//    })
//
//    //MOUSEOUT
//    .on("mouseout", function(d,i) {
//      if (i>0) {
//        //CIRCLE
//        d3.select(this).selectAll("circle")
//        .transition()
//        .duration(250)
//        .attr("r", function(d){
//          return radiusScale(d.stars)
//        })
//        .attr("fill", function(d) { return color(d.language); })
//
//        //TEXT
//        d3.select(this).select("text")
//        .transition()
//        .duration(250)
//        .attr("font-size","1em")
//        .attr("x", 8 )
//        .attr("y", 4 )
//      }
//    })
//
//    // .call(force.drag);
//
//
//  //CIRCLE
//  node.append("svg:circle")
//    .attr("cx", function(d) { return d.x; })
//    .attr("cy", function(d) { return d.y; })
//    .attr("r", function(d){
//        return radiusScale(d.stars)
//      })
//    .attr("fill", function(d) { return color(d.language); })
//
//  //TEXT
//  node.append("text")
//    .text(function(d, i) { return d.name; })
//    .attr("x",    function(d, i) { return radiusScale(d.stars) + 5; })
//    .attr("y",    function(d, i) { if (i>0) { return radiusScale(d.stars) + 0 }    else { return 8 } })
//    .attr("fill",  "red")
//    .attr("font-size",    function(d, i) {  return  "1em"; })
//    .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; }      else { return "end" } })
//
//
// simulation.nodes(nodes)
//   .on("tick", ticked)
//
// function ticked(e){
//   // circles
//   //   .attr("cx", function(d){
//   //     return d.x
//   //   })
//   //   .attr("cy", function(d){
//   //     return d.y
//   //   })
//     node.attr("transform", function(d) {
//      return "translate(" + d.x + "," + d.y + ")";
//  });
// }
// /////////////////////////////////////////
// ////////////////Search //////////////////
// /////////////////////////////////////////
// //adapted from http://jsfiddle.net/simonraper/Bf5nM/?utm_source=website&utm_medium=embed&utm_campaign=Bf5nM
// var searchableNamesArray = [];
// console.log(data);
// for (var i = 0; i < data.length - 1; i++) {
//     searchableNamesArray.push(data[i].name);
// }
// searchableNamesArray = searchableNamesArray.sort();
// $(function () {
//     $("#search").autocomplete({
//         source: searchableNamesArray
//     });
// });
// function searchRepo() {
//     //find the repo node
//     var selectedVal = document.getElementById('search').value;
//     var node = svg.selectAll(".node");
//     if (selectedVal == "none") {
//         node.style("stroke", "red").style("stroke-width", "1");
//     } else {
//         var selected = node.filter(function (d, i) {
//             return d.name != selectedVal;
//         });
//         selected.style("opacity", "0");
//
//         d3.selectAll(".node").transition()
//             .duration(5000)
//             .style("opacity", 1);
//     }
// } //end searchRepo
//
// // });//end csv function
//



// }//end createD3nodes


});  //end docunment ready
