
console.log("linked")

const WIDTH = 600;
const HEIGHT = 600;
const MARG = {left : 50, right : 50, top : 50, bottom : 50};

const FRAME = 
d3.select("#vis1")
    .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);

const VIS_HEIGHT = HEIGHT- MARG.top - MARG.bottom;
const VIS_WIDTH = WIDTH - MARG.left - MARG.right;


function main(){
    var svg = d3.select("svg")

    var X_SCALE = d3.scaleBand().range([0, VIS_WIDTH]).padding(0.4),
        Y_SCALE =  d3.scaleLinear().range([VIS_HEIGHT - 50,0]);

    var g = svg.append("g").attr("transform", "translate(" +100+","+100+")");

    d3.csv("data/data.csv").then(function(data){
        X_SCALE.domain(data.map((d)=>{return d.Category;}));
        Y_SCALE.domain([0,d3.max(data, (d)=> {return d.Value;})]);
        g.append("g").attr('transform','translate(0,' + (VIS_HEIGHT - 50) + ')')
            .call(d3.axisBottom(X_SCALE))

        g.append('g').call(d3.axisLeft(Y_SCALE).tickFormat((d)=>{
            return d;
        }).ticks(8));

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", (d) => {return X_SCALE(d.Category);})
        .attr("y", (d) => {return Y_SCALE(d.Value)})
        .attr("width", X_SCALE.bandwidth())
        .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE(d.Value) -50;});

      });
};
