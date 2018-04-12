
///////////////////////////
///////////D3////////////////

/////////////DATA////////////
var nodes =[
{ created_at : "2011-07-29T21:19:00Z",
  forks_count : 58909,
  homepage : "http://getbootstrap.com",
  id : 2126244,
  language : "CSS",
  name : "bootstrap",
  owner_avatar : "https://avatars0.githubusercontent.com/u/2918581?v=4",
  stars : 123578,
  updated_at : "2018-04-12T04:14:41Z",
},
{ created_at : "2015-11-07T01:19:20Z",
  forks_count : 61149,
  homepage : "https://tensorflow.org",
  id : 45717250,
  language : "C++",
  name : "tensorflow",
  owner_avatar: "https://avatars1.githubusercontent.com/u/15658638?v=4",
  stars: 95925,
  updated_at: "2018-04-12T04:25:33Z",
},
{ created_at:"2013-05-24T16:15:54Z",
  forks_count:17572,
  homepage:"https://reactjs.org",
  id:10270250,
  language:"JavaScript",
  name:"react",
  owner_avatar:"https://avatars3.githubusercontent.com/u/69631?v=4",
  stars:93256,
  updated_at:"2018-04-12T04:10:52Z",
},
{ created_at : "2013-07-29T03:24:51Z",
  forks_count : 13265,
  homepage : "http://vuejs.org",
  id : 11730342,
  language : "JavaScript",
  name : "vue",
  owner_avatar : "https://avatars1.githubusercontent.com/u/6128107?v=4",
  stars : 90384,
  updated_at : "2018-04-12T04:23:28Z"

},
{ created_at : "2010-09-27T17:22:42Z",
  forks_count : 19068,
  homepage : "https://d3js.org",
  id : 943149,
  language : "JavaScript",
  name : "d3",
  owner_avatar : "https://avatars1.githubusercontent.com/u/1562726?v=4",
  stars : 74708,
  updated_at : "2018-04-12T03:33:14Z"
},
{ created_at : "2012-11-01T23:13:50Z",
  forks_count : 13211,
  homepage : null,
  id : 6498492,
  language : "JavaScript",
  name : "javascript",
  owner_avatar : "https://avatars3.githubusercontent.com/u/698437?v=4",
  stars : 69267,
  updated_at : "2018-04-12T03:23:30Z"
},
{ created_at : "2009-08-28T18:15:37Z",
  forks_count : 14399,
  homepage : "http://ohmyz.sh/",
  id : 291137,
  language : "Shell",
  name : "oh-my-zsh",
  owner_avatar : "https://avatars2.githubusercontent.com/u/257?v=4",
  stars : 68602,
  updated_at : "2018-04-12T04:23:19Z"
},
{ created_at : "2015-01-09T18:10:16Z",
  forks_count : 14204,
  homepage : "http://facebook.github.io/react-native/",
  id : 29028775,
  language : "JavaScript",
  name : "react-native",
  owner_avatar : "https://avatars3.githubusercontent.com/u/69631?v=4",
  stars : 62451,
  updated_at : "2018-04-12T03:00:43Z"
},
{ created_at : "2013-04-12T01:47:36Z",
  forks_count : 7678,
  homepage : "https://electronjs.org",
  id : 9384267,
  language : "C++",
  name : "electron",
  owner_avatar : "https://avatars1.githubusercontent.com/u/13409222?v=4",
  stars : 58825,
  updated_at : "2018-04-12T02:57:46Z"
},
{ created_at : "2010-01-06T00:34:37Z",
  forks_count : 28892,
  homepage : "https://angularjs.org",
  id : 460078,
  language : "JavaScript",
  name : "angular.js",
  owner_avatar : "https://avatars3.githubusercontent.com/u/139426?v=4",
  stars : 58285,
  updated_at : "2018-04-12T04:05:39Z"
},
{ created_at : "2011-09-04T22:48:12Z",
  forks_count : 21130,
  homepage : "",
  id : 2325298,
  language : "C",
  name : "linux",
  owner_avatar : "https://avatars0.githubusercontent.com/u/1024025?v=4",
  stars : 57480,
  updated_at : "2018-04-12T04:18:52Z"
},
{ created_at : "2012-02-17T14:19:43Z",
  forks_count : 9587,
  homepage : "https://fontawesome.com",
  id : 3470471,
  language : "CSS",
  name : "Font-Awesome",
  owner_avatar : "https://avatars0.githubusercontent.com/u/1505683?v=4",
  stars : 55773,
  updated_at : "2018-04-12T03:17:31Z"
},
{ created_at : "2011-10-12T10:07:38Z",
  forks_count : 10882,
  homepage : "http://daneden.github.io/animate.css",
  id : 2561582,
  language : "CSS",
  name : "animate.css",
  owner_avatar : "https://avatars3.githubusercontent.com/u/439365?v=4",
  stars : 50568,
  updated_at : "2018-04-12T02:39:35Z"
},
{ created_at : "2009-04-03T15:20:14Z",
  forks_count : 15351,
  homepage : "https://jquery.com/",
  id : 167174,
  language : "JavaScript",
  name : "jquery",
  owner_avatar : "https://avatars1.githubusercontent.com/u/70142?v=4",
  stars : 48640,
  updated_at : "2018-04-12T03:24:15Z"
},
{ created_at : "2013-01-18T18:10:57Z",
  forks_count : 14238,
  homepage : "https://mobyproject.org/",
  id : 7691631,
  language : "Go",
  name : "moby",
  owner_avatar : "https://avatars1.githubusercontent.com/u/27259197?v=4",
  stars : 48429,
  updated_at : "2018-04-12T03:57:52Z"
},
{ created_at : "2014-06-27T21:00:06Z",
  forks_count : 9346,
  homepage : "https://awesome-python.com/",
  id : 21289110,
  language : "Python",
  name : "awesome-python",
  owner_avatar : "https://avatars2.githubusercontent.com/u/652070?v=4",
  stars : 48312,
  updated_at : "2018-04-12T04:20:30Z"
}
]


var color = d3.scaleOrdinal(d3.schemeCategory20);

var width = 840,
  height = 680;

// Define the div for the tooltip
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


var svg = d3.select("#stars-layout")
.append("svg")
.attr("height", height)
.attr("width", width)
.append("g")
.attr("transform", "translate(0,0)")




//RADIUS scale
var radiusScale = d3.scaleSqrt()
.domain([8613, 123511])
.range([2,28])
//FORCE SiMULATION
// a collection of forces to apply to circles

//REGULAR Circles
var forceXSeparate = d3.forceX(function(d){
  if(d.language === "Shell"){
    return (width / 4.8)
  } else if (d.language === "C" || d.language === "C++"){
    return (width / 3.4)
  } else if (d.language === "JavaScript"){
    return (width / 2.4)
  } else if (d.language === "Python"){
    return (width / 1.8)
  } else if (d.language === "Css"){
    return (width / 1.7)
  } else if (d.language === "Go"){
    return (width / 1.5)
  } else if (d.language === "Css"){
    return (width / 1.4)
  } else {
    return 780
  }
}).strength(0.5)

var forceXJoin = d3.forceX(width / 2).strength(0.25)

var forceCollide = d3.forceCollide(function(d){
  return radiusScale(d.stars) + 3
})

var forceXconcentric = d3.forceY(width / 3).strength(0.55)
// var concentric = circles.attr("cx", 30).attr("cy", 30)


//a collection of forces to apply to circles
var simulation = d3.forceSimulation()
  .force("x", forceXJoin)
  .force("y", d3.forceY(height / 2).strength(0.05))
  //collide related to radius, so if r = 10, a force of 10 had edges touching
  .force("collide", forceCollide)


d3.select("#language").on("click", function(){
simulation
  .force("x", forceXSeparate)
  //NOTE: needed to reset force simulation
  .alphaTarget(0.5)
  .restart()
})

d3.select("#all").on("click", function(){
simulation
  .force("x", forceXJoin)
  .alphaTarget(.5)
  .restart()
})

d3.select("#concentric").on("click", function(){

  simulation
    .force("x", forceXconcentric)
    .alphaTarget(.5)
    .restart()

})


var node = svg.selectAll("circle.node")
   .data(nodes)
   .enter().append("g")
   .attr("class", "node")
   .on("start", dragstarted)
   .on("drag", dragged)
   .on("end", dragended);

function dragstarted(d) {
d3.select(this).raise().classed("active", true);
}

function dragged(d) {
d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
d3.select(this).classed("active", false);
}

 //CIRCLE
 node.append("svg:circle")
   .attr("cx", function(d) { return d.x; })
   .attr("cy", function(d) { return d.y; })
   .attr("r", function(d){
       return radiusScale(d.stars)
     })
   .attr("fill", function(d) { return color(d.language); })

 //TEXT
 node.append("text")
   .text(function(d) { return d.name; })
   .attr("dx", 10)
   .attr("dy", ".35em")
   .attr("fill",  "red")
   .attr("font-size",  "1em")
   // .attr("text-anchor",  function(d) { if (i>0) { return  "beginning"; }      else { return "end" } })
   .attr({
         "alignment-baseline": "middle",
         "text-anchor" : "middle"
             })


simulation.nodes(nodes)
  .on("tick", ticked)

function ticked(e){

    node.attr("transform", function(d, i) {
     return "translate(" + d.x + "," + d.y + ")";

 });
}
/////////////////////////////////////////
////////////////Search //////////////////
/////////////////////////////////////////
//adapted from http://jsfiddle.net/simonraper/Bf5nM/?utm_source=website&utm_medium=embed&utm_campaign=Bf5nM
var searchableNamesArray = [];
for (var i = 0; i < nodes.length - 1; i++) {
    searchableNamesArray.push(nodes[i].name);
}
$(function () {
    $("#search").autocomplete({
        source: searchableNamesArray
    });
});
function searchRepo() {
    //find the repo node
    var selectedVal = document.getElementById('search').value;
    var node = svg.selectAll(".node");
    var selected = node.filter(function (d, i) {
            return d.name != selectedVal;
        });
    selected.style("opacity", "0.3");

    d3.selectAll(".node").transition()
        .duration(5000)
        .style("opacity", 1);
   document.getElementById('search').value = '';
}
