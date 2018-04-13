var data = [
    {key: "Glazed",     value: 132},
    {key: "Jelly",      value: 71},
    {key: "Holes",      value: 337},
    {key: "Sprinkles",  value: 93},
    {key: "Crumb",      value: 78},
    {key: "Chocolate",  value: 43},
    {key: "Coconut",    value: 20},
    {key: "Cream",      value: 16},
    {key: "Cruller",    value: 30},
    {key: "Éclair",     value: 8},
    {key: "Fritter",    value: 17},
    {key: "Bearclaw",   value: 21}
];
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
            return d.value;
        })])
        .range([0, width]);
var y = d3.scaleBand()
        .domain(data.map(function(entry){
            return entry.key;
        }))
        .range([height, 0])
		.padding(0.1);
