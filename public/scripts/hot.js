console.log("Sanity insanitum: JS is working!");
$(document).ready(function() {

  ///////////////////////////////////////////////////////////////
  // POPULAR LIST SIDEBAR
  /////////////////////////////////////////////////////////////
  var $popularList;
  var allRepos = [];
  var nodes = [];


  // automatically populate list on ready
  $popularList = $("#popular-list");

  $.ajax({
    method: "GET",
    url: "/api/repos/popular",
    timeout: 2000,
    success: handleSuccess,
    error: handleError
  });


  function handleSuccess(json) {
    allRepos = json.popular;
    var reposHtml = getAllReposHtml(allRepos);
    $popularList.prepend(reposHtml);
    var newNodes = createD3nodes(allRepos.items);
  }

  function handleError(e,ts) {
    if(ts==="timeout") {
              alert("Call has timed out"); //Handle the timeout
          } else {
    coneole.log('Failed to load user repos, is the server working?');


  }

  }

  function changeStyle(reposHtml) {
    var list = document.getElementsByClassName("repo-item");
    for (var item of reposHtml) {
      // console.log(item.dataset);
    }
  }

  function getRepoHtml(repo) {
    if(repo.language !== null && repo !== '') {

    var star = String.fromCodePoint("0x2606");

    return `
          <article class="repo-item">
            <hr>

              <p data-stars=${repo.stargazers_count}>
                <a href="${repo.homepage}" target="_blank">
                <b class="repo-name">${repo.name}</b>
              </a>
              </p>
              <span class="repo-stargazers_count">${star} ${repo.stargazers_count}</span>
          </article>
      `;
    }
  }

  function getAllReposHtml(repos) {
      // repos = changeStyle(repos)
      return repos.items.map(getRepoHtml).join("");
    }
    //////////////////////////////////////////////////////////
    // END of POPULAR LIST
    ///////////////////////////////////////////////////////////
}); //end document ready

///////////////////////////////////////////////////////////
///////////D3 FORCE LAYOUT begin////////////////
///////////////////////////////////////////////////////////
//
// //Get data from success
function createD3nodes(data, nodes) {

  const languageOnlyData =[];
  const initialScaleData = [];
  data.forEach(function(repo) {
  if(repo.language !== null && repo.name !== "freeCodeCamp") {
    languageOnlyData.push(repo);
    initialScaleData.push(repo.stargazers_count);
   }
 });//end data.forEach
    var nodes = languageOnlyData.map(function(repo) {


      return {
        id: repo.id,
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

    const newScaledData = [];
    const minDataPoint = d3.min(initialScaleData);
    const maxDataPoint = d3.max(initialScaleData);
    console.log(minDataPoint, maxDataPoint);
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // Set the dimensions of the canvas / graph
  var margin = {top: 20, right: 10, bottom: 20, left: 10},
    width = 760 - margin.left - margin.right,
    height = 680 - margin.top - margin.bottom;

    // Define the div for the tooltip
    var tip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


    var svg = d3.select("#stars-layout")
      // .append("svg")
      // .attr("height", height)
      // .attr("width", width)
      // .append("g")
      // .attr("transform", "translate(0,0)")
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .attr("id", function(d, i) { return (i); })
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 760 680")
      ;


    //RADIUS scale
    var radiusScale = d3.scaleSqrt()
      .domain([minDataPoint, maxDataPoint])
      .range([14, 38])

    //FORCE SiMULATION
    // a collection of forces to apply to circles


    //REGULAR Circles
    var forceXSeparate = d3.forceX(function(d) {
      if (d.language === "Shell") {
        return (width / 8.7)
      } else if (d.language === "C") {
        return (width / 4.5)
      } else if (d.language === "C++"){
        return (width / 3.1)
      } else if (d.language === "JavaScript") {
        return (width / 2.2)
      } else if (d.language === "Python") {
        return (width / 1.6)
      } else if (d.language === "Go") {
        return (width / 1.3)
      } else if (d.language === "Css") {
        return (width / 1.1)
      } else if (d.language === "TypeScript") {
        return (width / 1)
      } else {
        return 620
      }
    }).strength(0.5)


    var forceXJoin = d3.forceX(width / 2).strength(0.05)


    var forceCollide = d3.forceCollide(function(d) {
      return radiusScale(d.stars) + 15
    })

    var forceXconcentric = d3.forceY(width / 3).strength(0.55)
      // var concentric = circles.attr("cx", 30).attr("cy", 30)


    //a collection of forces to apply to circles
    var simulation = d3.forceSimulation()
      .force("x", forceXJoin)
      .force("y", d3.forceY(height / 2).strength(0.05))
      //collide related to radius, so if r = 10, a force of 10 had edges touching
      .force("collide", forceCollide)


    d3.select("#language").on("click", function() {
      simulation
        .force("x", forceXSeparate)
        //NOTE: needed to reset force simulation
        .alphaTarget(0.5)
        .restart()
    })

    d3.select("#all").on("click", function() {
      simulation
        .force("x", forceXJoin)
        .alphaTarget(.5)
        .restart()
    })

    d3.select("#concentric").on("click", function() {
      simulation
        .force("x", forceXconcentric)
        .alphaTarget(.5)
        .restart()

    })

    var star = String.fromCodePoint("0x2606");

    var node = svg.selectAll("circle.node")
      .data(nodes)
      .enter().append("g")
      .attr("stroke-width", 1)
      .attr("stroke", "white")
      .on("mouseover", function(d) {
           tip.transition()
               .duration(200)
               .style("opacity", .9);
           tip.html( d.name + "<br/>" + d.language + "<br/>"+ `${star}`+d.stars + "<br/>")
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
           })
       .on("mouseout", function(d) {
           tip.transition()
               .duration(500)
               .style("opacity", 0);
       })
      .attr("class", "node");
      // .on("start", dragstarted)
      // .on("drag", dragged)
      // .on("end", dragended);

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
    node.append("circle")
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      })
      .attr("r", function(d) {
        return radiusScale(d.stars)
      })
      .attr("fill", function(d) {
        return color(d.language);
      })

    //TEXT label
    // node.append("text")
    //   .attr("class", "textLabels")
    //   .attr("text-anchor", "middle")
    //   .text(function(d) {
    //     return d.name;
    //   })
    //   .attr("dx", 0)
    //   .attr("dy", ".35em")
    //   .attr("fill", "blue")
    //   .attr("font-size", "1em")

   //Toggle Labels visibility
   // svg.append("text")
   //  .attr("x", 0)
   //  .attr("y", height + margin.top + 10)
   //  .attr("class", "legend")
   //  .style("fill", "steelblue")
   //  .on("click", function(){
   //      // Determine if current line is visible
   //      var active   = textLabels.active ? false : true,
   //        newOpacity = active ? 1 : 0;
   //      // Hide or show the elements
   //      d3.select(".textLabels").style("opacity", newOpacity);
   //      // Update whether or not the elements are active
   //      textLabels.active = active;
   //   })
   //  .text("Toggle lables");

    //LEGEND
    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .style("fill", "white")
      .text(function(d) {
        return d;
      });


    simulation.nodes(nodes)
      .on("tick", ticked)

    function ticked(e) {

        node.attr("transform", function(d, i) {
          return "translate(" + d.x + "," + d.y + ")";

        });
      }
      /////////////////////////////////////////
      ////////////////Search //////////////////
      /////////////////////////////////////////
      //adapted from http://jsfiddle.net/simonraper/Bf5nM/?utm_source=website&utm_medium=embed&utm_campaign=Bf5nM

    $("#searchbutton").on("click", function() {
      //find the repo node
      var selectedVal = document.getElementById('search').value;
      var node = svg.selectAll(".node");
      var selected = node.filter(function(d, i) {
        return d.name != selectedVal;
      });
      selected.style("opacity", "0.2");

      d3.selectAll(".node").transition()
        .duration(5000)
        .style("opacity", 1);
      document.getElementById('search').value = '';
    })

    var searchableNamesArray = [];
    for (var i = 0; i < nodes.length - 1; i++) {
      searchableNamesArray.push(nodes[i].name);
    }
    $(function() {
      $("#search").autocomplete({
        source: searchableNamesArray
      });
    });

    function searchRepo() {
      //find the repo node
      var selectedVal = document.getElementById('search').value;
      var node = svg.selectAll(".node");
      var selected = node.filter(function(d, i) {
        return d.name != selectedVal;
      });
      selected.style("opacity", "0.25");

      d3.selectAll(".node").transition()
        .duration(4000)
        .style("opacity", 1);
      document.getElementById('search').value = '';
    }

  } //end createD3nodes
