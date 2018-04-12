///FAKE TEST DATA
var  data = [
  {
    name:"vue",
    language: 'JavaScript',
    stargazers_count: 90163,
    avatar_url: 'https://avatars1.githubusercontent.com/u/6128107?v=4',
    homepage: 'http://vuejs.org'
  },
  {
    name:"bootstrap",
    language: 'Python',
    stargazers_count: 123511,
    avatar_url: 'https://avatars0.githubusercontent.com/u/2918581?v=4',
    homepage: 'http://getbootstrap.com'
  },
  {
    name:"reaJact",
    language: 'Java',
    stargazers_count: 93126,
    avatar_url: 'https://avatars3.githubusercontent.com/u/69631?v=4',
  },
  {
  name:"javascript",
  language: 'JavaScript',
  stargazers_count: 69186,
  avatar_url: 'https://avatars3.githubusercontent.com/u/698437?v=4'
  },
  {
    name:"eJava",
    language: 'Java',
    stargazers_count: 52765
  },
  {
    name:"jquery",
    language: 'Python',
    stargazers_count: 48613
  },
  {
    name:"lamda",
    language: 'Lisp',
    stargazers_count: 8613
  }

];


// var data = [
//     {key: "Glazed",     value: 132},
//     {key: "Jelly",      value: 71},
//     {key: "Holes",      value: 337},
//     {key: "Sprinkles",  value: 93},
//     {key: "Crumb",      value: 78},
//     {key: "Chocolate",  value: 43},
//     {key: "Coconut",    value: 20},
//     {key: "Cream",      value: 16},
//     {key: "Cruller",    value: 30},
//     {key: "Éclair",     value: 8},
//     {key: "Fritter",    value: 17},
//     {key: "Bearclaw",   value: 21}
// ];
var w = 500;
var h = 300;
var margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;
var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.stargazers_count;
        })])
        .range([0, width]);
var y = d3.scaleBand()
        .domain(data.map(function(entry){
          console.log(entry);
            return entry.name;
        }))
        .range([height, 0])
		.padding(0.1);

var svg = d3.select("#profile-layout")
            .attr("id", "chart")
            .attr("width", w)
            .attr("height", h);
var chart = svg.append("g")
            .classed("display", true)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
function plot(params){
    this.selectAll(".bar")
        .data(params.data)
        .enter()
            .append("rect")
            .classed("bar", true)
            // .attr("x", function(d) {
				// return x(d.value); })
            .attr("y", function(d,i){
                return y(d.name);
            })
            .attr("height", y.bandwidth())
            .attr("width", function(d){
                return x(d.stargazers_count);
            });

}
plot.call(chart, {data: data});
