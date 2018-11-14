import * as d3 from 'd3'; 

const D3BubbleColumn = {};

D3BubbleColumn.create = (el, data, config) => {
    //console.log(el);
    //console.log(data);

    // Setup chart dimensions and margins
    const margin = { top: 20, right: 20, bottom: 35, left: 20 };
    const width = parseInt(d3.select('.l-story-grid-column-half').style('width')) - margin.left - margin.right;
    //const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // constants
    const tilesPerRow = 10;
    const tileSize = 10;
    const barPadding = 20;
    const barWidth = (tilesPerRow * tileSize) + barPadding;

    // const tilesPerRow = 10;
    // const barPadding = 20;
    // const bars = 5;
    // const barWidth = width / bars;
    // const tileSize = (barWidth-barPadding)/tilesPerRow;

    // bins
    let bins, bin1 = 0, bin2 = 0, bin3 = 0, bin4 = 0, bin5 = 0;

    // colors
    var colors = ["#2A316C", "#00B3EE", "#F27B21", "#EF4060", "#00A992"];
    
	// Setup svg element
    let svg = d3.select(el).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .classed('chart', true);

    let axisG = svg.append('g')
        .classed('y', true)
        .classed('axis', true)
        .attr('transform', 'translate(0, 20)')
        .style("font-family", "Avenir")
        .style("font-size", "12px")
        .style("fill", "#777");

    let barsG = svg.append('g')
        .classed('bars', true);
 

    function initializeData() {
        // filter out non-assessible parcels
        let filtered_features = data.features.filter(function(d) {
            return d.properties.assessable_Assessable === "yes";
        });

        // count up the number of assessible properties in each bin
        for (let index = 0; index < filtered_features.length; index++) {
            let d = filtered_features[index];
            if (+d.properties.assessable_BIZAsmt <= 1000) {
                bin1++;
            } else if (+d.properties.assessable_BIZAsmt <= 10000){
                bin2++;
            } else if (+d.properties.assessable_BIZAsmt <= 25000){
                bin3++;
            } else if (+d.properties.assessable_BIZAsmt <= 50000){
                bin4++;
            } else {
                bin5++;
            }            
        }

        bins = [
            {name: "$0 - $1K", value: bin1}, 
            {name: "$1K - $10K", value: bin2}, 
            {name: "$10K - $25K", value: bin3}, 
            {name: "$25K - $50K", value: bin4},
            {name: "$50K - $150K", value: bin5},  
        ];

        return bins;
        
    }

    function getTiles(num) {
        var tiles = [];
            
        for (var i = 0; i < num; i++) {
            var rowNumber = Math.floor(i / tilesPerRow);
            tiles.push({
                x: (i % tilesPerRow) * tileSize,
                y: -(rowNumber + 1) * tileSize
            });
        }
            
        return tiles;
    }

    function updateBar(d, i) {
        const tiles = getTiles(d.value);

        let u = d3.select(this)
            .attr("transform", "translate(" + i * barWidth + ", 300)")
            .selectAll("rect")
            .data(tiles);

        u.enter()
            .append("circle")
            .style("stroke", "white")
            .style("stroke-width", "0.5")
            .merge(u)
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            })
            .attr("r", tileSize/2);
           
        u.exit().remove();

    }


    // function updateLabel(d) {
    //     let element = d3.select(this)
    //       .select("text");
      
    //     if(element.empty()) {
    //         element = d3.select(this)
    //             .append("text")
    //             .attr("y", -8)
    //             .attr("x", 6)
    //             .attr("transform", "rotate(-90)")
    //             .style("font-family", "Avenir")
    //             .style("font-size", "12px")
    //             .style("fill", "#777");
    //     }
      
    //     element.text(d.name);
    // }

    // Horizontal labels
    function updateLabel(d) {
      var el = d3.select(this)
        .select("text");
    
      if(el.empty()) {
        el = d3.select(this)
          .append("text")
          .attr("x", 0.45 * tilesPerRow * tileSize)
          .attr("y", 15)
          .style("text-anchor", "middle")
          .style("font-family", "Avenir")
          .style("font-size", "12px")
          .style("fill", "#777");
      }
    
      let label = d.name.length > 12 ? d.name.slice(0, 12) + '...' : d.name;
      el.text(label);
    }

    function updateBars() {
        let u = barsG
            .selectAll("g")
            .data(bins);
         
        u.enter()
            .append("g")
            .merge(u)
            .style("fill", function(d, i) {
                return colors[i % colors.length];
            })
            .each(updateBar)
            .each(updateLabel);
         
        u.exit().remove();
    }

    function updateAxis() {
        const maxValue = d3.max(bins, function(d){ return d.value + 20; })
        const chartWidth = bins.length * barWidth;
        const chartHeight = (maxValue / tilesPerRow) * tileSize;
      
        var yScale = d3.scaleLinear().domain([0, maxValue]).range([chartHeight, 0]);
        var yAxis = d3.axisRight().scale(yScale).tickSize(chartWidth);
      
        axisG.call(yAxis);
    }

    function initialize() {
        initializeData();
    }

    initialize();
    updateBars();
    updateAxis();

};

D3BubbleColumn.update = (el, data, configuration, chart) => {
    // D3 Code to update the chart
};

D3BubbleColumn.destroy = () => {
    // Cleaning code here
};

export default D3BubbleColumn;
