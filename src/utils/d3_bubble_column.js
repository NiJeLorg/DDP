import * as d3 from 'd3';
import L from 'leaflet';
import mapConfig from '../utils/maps';


const D3BubbleColumn = {};

D3BubbleColumn.create = (el, data, config) => {
    //console.log(el);
    //console.log(data);

    // Setup chart dimensions and margins
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = parseInt(d3.select('.l-story-grid-column-half').style('width')) - margin.left - margin.right;
    //const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // constants
    // const tilesPerRow = 10;
    // const tileSize = 10;
    // const barPadding = 20;
    // const barWidth = (tilesPerRow * tileSize) + barPadding;

    const barPadding = 10;
    const tilesPerRow = 10;
    let bars = 5;
    let barWidth = (width / bars) - barPadding;
    const tileSize = (barWidth - barPadding) / tilesPerRow;


    // bins
    let bins, bin1 = 0, bin2 = 0, bin3 = 0, bin4 = 0, bin5 = 0;

    // sub bins
    let bins1, bin1_1 = 0, bin1_2 = 0, bin1_3 = 0, bin1_4 = 0;
    let bins2, bin2_1 = 0, bin2_2 = 0, bin2_3 = 0, bin2_4 = 0;
    let bins3, bin3_1 = 0, bin3_2 = 0, bin3_3 = 0, bin3_4 = 0;
    let bins4, bin4_1 = 0, bin4_2 = 0, bin4_3 = 0, bin4_4 = 0;
    let bins5, bin5_1 = 0, bin5_2 = 0, bin5_3 = 0, bin5_4 = 0;

    // sub bin toggle
    let sub_bin_toggle = false;

    // colors
    var colors = ["#2A316C", "#00B3EE", "#F27B21", "#EF4060", "#00A992"];
    
	// Setup svg element
    let svg = d3.select(el).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .classed('chart', true);

    // add reset button
    d3.select(el).append('button')
        .classed("c-reset-button", true)
        .attr("title", "Reset Chart")
        .on("click", resetChart);

    let axisG = svg.append('g')
        .classed('y', true)
        .classed('axis', true)
        .attr("id", "yAxis")
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

        // count up the number of assessible properties in each bin and sub bin
        for (let index = 0; index < filtered_features.length; index++) {
            let d = filtered_features[index];
            if (+d.properties.assessable_BIZAsmt <= 1000) {
                bin1++;
                if (+d.properties.assessable_BIZAsmt <= 250) {
                    bin1_1++;
                } else if (+d.properties.assessable_BIZAsmt <= 500) {
                    bin1_2++;
                } else if (+d.properties.assessable_BIZAsmt <= 750) {
                    bin1_3++;
                } else if (+d.properties.assessable_BIZAsmt <= 1000) {
                    bin1_4++;
                }
            } else if (+d.properties.assessable_BIZAsmt <= 10000){
                bin2++;
                if (+d.properties.assessable_BIZAsmt <= 2500) {
                    bin2_1++;
                } else if (+d.properties.assessable_BIZAsmt <= 5000) {
                    bin2_2++;
                } else if (+d.properties.assessable_BIZAsmt <= 7500) {
                    bin2_3++;
                } else if (+d.properties.assessable_BIZAsmt <= 10000) {
                    bin2_4++;
                }
            } else if (+d.properties.assessable_BIZAsmt <= 25000){
                bin3++;
                if (+d.properties.assessable_BIZAsmt <= 13750) {
                    bin3_1++;
                } else if (+d.properties.assessable_BIZAsmt <= 17500) {
                    bin3_2++;
                } else if (+d.properties.assessable_BIZAsmt <= 21250) {
                    bin3_3++;
                } else if (+d.properties.assessable_BIZAsmt <= 25000) {
                    bin3_4++;
                }
            } else if (+d.properties.assessable_BIZAsmt <= 50000){
                bin4++;
                if (+d.properties.assessable_BIZAsmt <= 31250) {
                    bin4_1++;
                } else if (+d.properties.assessable_BIZAsmt <= 37500) {
                    bin4_2++;
                } else if (+d.properties.assessable_BIZAsmt <= 43750) {
                    bin4_3++;
                } else if (+d.properties.assessable_BIZAsmt <= 50000) {
                    bin4_4++;
                }
            } else {
                bin5++;
                if (+d.properties.assessable_BIZAsmt <= 75000) {
                    bin5_1++;
                } else if (+d.properties.assessable_BIZAsmt <= 100000) {
                    bin5_2++;
                } else if (+d.properties.assessable_BIZAsmt <= 125000) {
                    bin5_3++;
                } else if (+d.properties.assessable_BIZAsmt <= 150000) {
                    bin5_4++;
                }
            }            
        }

        bins1 = [
            {name: "$0 - $250", value: bin1_1, color: colors[0]}, 
            {name: "$250 - $500", value: bin1_2, color: colors[0]}, 
            {name: "$500 - $750", value: bin1_3, color: colors[0]}, 
            {name: "$750 - $1K", value: bin1_4, color: colors[0]},
        ];

        bins2 = [
            {name: "$1K - $2.5K", value: bin2_1, color: colors[1]}, 
            {name: "$2.5K - $5K", value: bin2_2, color: colors[1]}, 
            {name: "$5K - $7.5K", value: bin2_3, color: colors[1]}, 
            {name: "$7.5K - $10K", value: bin2_4, color: colors[1]},
        ];

        bins3 = [
            {name: "$10K - $13,750", value: bin3_1, color: colors[2]}, 
            {name: "$13,750 - $17,500", value: bin3_2, color: colors[2]}, 
            {name: "$17,500 - $21,250", value: bin3_3, color: colors[2]}, 
            {name: "$21,250 - $25K", value: bin3_4, color: colors[2]},
        ];

        bins4 = [
            {name: "$25K - $31,250", value: bin4_1, color: colors[3]}, 
            {name: "$31,250 - $37,500", value: bin4_2, color: colors[3]}, 
            {name: "$37,500 - $43,750", value: bin4_3, color: colors[3]}, 
            {name: "$43,750 - $50K", value: bin4_4, color: colors[3]},
        ];

        bins5 = [
            {name: "$50K - $75K", value: bin5_1, color: colors[4]}, 
            {name: "$75K - $100K", value: bin5_2, color: colors[4]}, 
            {name: "$100K - $125K", value: bin5_3, color: colors[4]}, 
            {name: "$125K - $150K", value: bin5_4, color: colors[4]},
        ];

        bins = [
            {name: "$0 - $1K", value: bin1, sub_bins: bins1, color: colors[0]}, 
            {name: "$1K - $10K", value: bin2, sub_bins: bins2, color: colors[1]}, 
            {name: "$10K - $25K", value: bin3, sub_bins: bins3, color: colors[2]}, 
            {name: "$25K - $50K", value: bin4, sub_bins: bins4, color: colors[3]},
            {name: "$50K - $150K", value: bin5, sub_bins: bins5, color: colors[4]},  
        ];

        return bins;
        
    }

    function updateChart(d) {
        bars = 4;
        barWidth = (width / bars) - barPadding;

        for (let index = 0; index < bins.length; index++) {
            if (bins[index].name === d.bin) {
                updateBars(bins[index].sub_bins);
                sub_bin_toggle = true;
            }    
        }
    }

    function resetChart() {
        bars = 5;
        barWidth = (width / bars) - barPadding;   
        updateBars(bins);
        updateMap(bins);        
        sub_bin_toggle = false;
    }

    function getTiles(d) {
        var tiles = [];

        for (var i = 0; i < d.value; i++) {
            var rowNumber = Math.floor(i / tilesPerRow);
            tiles.push({
                x: (i % tilesPerRow) * tileSize,
                y: -(rowNumber + 1) * tileSize,
                bin: d.name,
            });
        }
            
        return tiles;
    }

    function updateBar(d, i) {
        const tiles = getTiles(d);

        const traslateWidth = (i * barWidth) + (tileSize / 2);

        let u = d3.select(this)
            .attr("transform", "translate(" + traslateWidth + ", " + height + ")")
            .selectAll("circle")
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
            .attr("r", tileSize/2)
            .attr("cursor", "pointer")
            .on("click", function(d){

                // update map
                updateMap(d);

                // update chart
                if (sub_bin_toggle) {
                    resetChart();
                } else {
                    updateChart(d);
                }

            });
           
        u.exit().remove();

    }

    function updateMap(d) {
        // update the map based on the item clicked on selection
        global.geomap.eachLayer(function (layer) {
            if (layer.options['id'] !== 'mapbox.light') {
                layer.remove();
            }
        });

        // add filtered geojson data
        const geoJsonLayer = L.geoJSON(mapConfig.ASSESSMENT_PARCEL_DATA_FILE, {
            style: function(feature) {
                return {
                fillColor: setOrdinalColor(feature.properties.assessable_BIZAsmt),
                color: "#fff",
                weight: 1,
                fillOpacity: 0.6
                }
            },
            filter: function(feature, layer) {
                if (d.bin === "$0 - $1K") {
                    return (feature.properties.assessable_BIZAsmt <= 1000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$1K - $10K") {
                    return (feature.properties.assessable_BIZAsmt > 1000 &&feature.properties.assessable_BIZAsmt <= 10000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$10K - $25K") {
                    return (feature.properties.assessable_BIZAsmt > 10000 &&feature.properties.assessable_BIZAsmt <= 25000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$25K - $50K") {
                    return (feature.properties.assessable_BIZAsmt > 25000 &&feature.properties.assessable_BIZAsmt <= 50000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$50K - $150K") {
                    return (feature.properties.assessable_BIZAsmt > 50000 &&feature.properties.assessable_BIZAsmt <= 150000 && feature.properties.assessable_BIZAsmt);
                } else {
                    return feature
                }
            },
            onEachFeature: mapConfig.assessmentToolTip
        }).addTo(global.geomap);

        global.geomap.fitBounds(geoJsonLayer.getBounds());

        function setOrdinalColor(d) {
            if (d) {
                return  d > 50000  ? '#00A992' :
                        d > 25000  ? '#EF4060' :
                        d > 10000  ? '#F27B21' :
                        d > 1000   ? '#00B3EE' :
                        '#2A316C';
            } else {
                return "#ccc";
            }
        }
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
    
      //let label = d.name.length > 12 ? d.name.slice(0, 12) + '...' : d.name;
      let label = d.name;
      el.text(label);
    }

    function updateBars(d_bins) {
        let u = barsG
            .selectAll("g")
            .data(d_bins);
         
        u.enter()
            .append("g")
            .merge(u)
            .style("fill", function(d) {
                return d.color;
            })
            .each(updateBar)
            .each(updateLabel);
         
        u.exit().remove();
    }

    function updateAxis() {
        const maxValue = d3.max(bins, function(d){ return d.value + 20; })
        const chartWidth = bins.length * barWidth;
        const chartHeight = (maxValue / tilesPerRow) * tileSize;

        d3.select("#yAxis").attr('transform', 'translate(0, '+ (height - chartHeight - (tileSize / 2)) + ')')
      
        const yScale = d3.scaleLinear().domain([0, maxValue]).range([chartHeight, 0]);
        const yAxis = d3.axisRight().scale(yScale).tickSize(chartWidth);
      
        axisG.call(yAxis);
    }

    function initialize() {
        initializeData();
    }

    initialize();
    updateBars(bins);
    updateAxis();

};

D3BubbleColumn.update = (el, data, configuration, chart) => {
    // D3 Code to update the chart
};

D3BubbleColumn.destroy = () => {
    // Cleaning code here
};

export default D3BubbleColumn;
