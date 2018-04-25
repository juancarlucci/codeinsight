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

  // $.ajax({
  //   method: "GET",
  //   url: "/api/repos/popular",
  //   success: handleSuccess,
  //   error: handleError
  // });


  function handleSuccess(json) {
    allRepos = json.popular;
    var reposHtml = getAllReposHtml(allRepos);
    $popularList.append(reposHtml);
    var newNodes = createD3nodes(allRepos.items);
  }

  function handleError(e) {
    $("#popular-list").text('Failed to load popular repos, is the server working?');
  }

  function changeStyle(reposHtml) {
    var list = document.getElementsByClassName("repo-item");
    for (var item of reposHtml) {
      // console.log(item.dataset);
    }
  }

  function getRepoHtml(repo) {
    return `
          <article class="repo-item">
            <hr>

              <p data-stars=${repo.stargazers_count}>
                <a href="${repo.homepage}" target="_blank">
                <b class="repo-name">${repo.name}</b>
              </a>
              </p>
              <span class="repo-stargazers_count">${repo.stargazers_count}</span>
              <span class="repo-language">${repo.language}</span>
          </article>
      `;
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
function createD3nodes(data) {

    var nodes = data.map(function(repo) {

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
      .range([2, 38])

    //FORCE SiMULATION
    // a collection of forces to apply to circles

    //REGULAR Circles
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
        return (width / 1.2)
      } else {
        return 680
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

    //TEXT
    node.append("text")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.name;
      })
      .attr("dx", 0)
      .attr("dy", ".35em")
      .attr("fill", "white")
      .attr("font-size", "1em")

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
