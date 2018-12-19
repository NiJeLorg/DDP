import * as d3 from 'd3';
import L from 'leaflet';
import mapConfig from '../utils/maps';


const D3BubbleColumn = {};

D3BubbleColumn.create = (el, data, config) => {
    // listen for element to scroll into view and then fire the 
    document.addEventListener('scroll', function(e){ 
        function elementScrolled(elem) {
            var docViewTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var docViewBottom = docViewTop + document.body.clientHeight;
            var elemTop = elem.offsetTop + 700;
            return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
        }
        if(elementScrolled(el)) {
            if (!showing) {
                opacity = 1;
                updateBars(bins);
                showing = true;
                global.geomap.invalidateSize();
            }
        }     
    }, true);


    // Setup chart dimensions and margins
    const margin = { top: 20, right: 20, bottom: 20, left: 70 };
    let width;
    let height;
    let opacity = 0;
    let showing = false;

    if (parseInt(d3.select('.distribution-chart-wrapper').style('width')) > 770) {
        width = parseInt(d3.select('.l-story-grid-column-half').style('width')) - margin.left - margin.right + 300;
        height = width/1.8 - margin.top - margin.bottom;
    } else {
        width = parseInt(d3.select('.distribution-chart-wrapper').style('width')) - margin.left - margin.right;
        height = width/1.8 - margin.top - margin.bottom;
    }
    
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
    let bins, bin1 = 0, bin2 = 0, bin3 = 0, bin4 = 0, bin5 = 0, bin6 = 0;

    // sub bins
    let bins1, bin1_1 = 0, bin1_2 = 0, bin1_3 = 0, bin1_4 = 0;
    let bins2, bin2_1 = 0, bin2_2 = 0, bin2_3 = 0, bin2_4 = 0;
    let bins3, bin3_1 = 0, bin3_2 = 0, bin3_3 = 0, bin3_4 = 0;
    let bins4, bin4_1 = 0, bin4_2 = 0, bin4_3 = 0, bin4_4 = 0;
    let bins5, bin5_1 = 0, bin5_2 = 0, bin5_3 = 0, bin5_4 = 0;

    // sub bin toggle
    let sub_bin_toggle = false;

    // colors
    const colors = ["#F27B20", "#B2B5D3", "#5C6298", "#2A316C", "#0B103F"];

    // y-axis text
    let y_axis_label;
    
	// Setup svg element
    let svg = d3.select(el).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .classed('chart', true);

    // add reset button
    setTimeout(function() { 
        d3.select('.leaflet-top.leaflet-right').append('div')
            .classed("leaflet-bar", true)
            .classed("leaflet-control-layer-select", true)
            .classed("leaflet-control", true)
            .append('button')
            .classed("c-reset-button", true)
            .attr("title", "Reset map layers")
            .text("RESET MAP")
            .on("click", resetChart);
    }, 1000);
    
    // svg.append('g')
    //     .append("text")
    //     .classed('chart-header', true)
    //     .text("Many BIZ assessed parcels are assessed less than"); 
        
    // svg.append('g')
    //     .append("text")
    //     .attr("y", 25)
    //     .classed('chart-header', true)
    //     .text("$1,000, with the median parcel being assessed $1,207.");   
    
    d3.select(el).append('div')
        .classed("sub-heading__centered", true)
        .style("margin-top", "20px")
        .text("The median parcel is assessed $1,207.");


    let axisG = svg.append('g')
        .classed('y', true)
        .classed('axis', true)
        .attr("id", "yAxis")
        .style("font-family", "Avenir")
        .style("font-size", "12px")
        .style("fill", "#312f2f");

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
            } else if (+d.properties.assessable_BIZAsmt < 150000) {
                bin5++;
                if (+d.properties.assessable_BIZAsmt <= 75000) {
                    bin5_1++;
                } else if (+d.properties.assessable_BIZAsmt <= 100000) {
                    bin5_2++;
                } else if (+d.properties.assessable_BIZAsmt <= 125000) {
                    bin5_3++;
                } else if (+d.properties.assessable_BIZAsmt < 150000) {
                    bin5_4++;
                }
            } else if (+d.properties.assessable_BIZAsmt === 150000) {
                bin6++;
            }          
        }

        bins1 = [
            {name: "$1 - $250", value: bin1_1, color: colors[0]}, 
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


        // temporarily adding bins 3 and 4 together until refactor
        // bins = [
        //     {name: "$1 - $1K", value: bin1, sub_bins: bins1, color: colors[0]}, 
        //     {name: "$1K - $10K", value: bin2, sub_bins: bins2, color: colors[1]}, 
        //     {name: "$10K - $25K", value: bin3, sub_bins: bins3, color: colors[2]}, 
        //     {name: "$25K - $50K", value: bin4, sub_bins: bins4, color: colors[3]},
        //     {name: "$50K - $150K", value: bin5, sub_bins: bins5, color: colors[4]},
        //     {name: "$150K", value: bin6, sub_bins: bins5, color: colors[5]},  
        // ];

        bins = [
            {name: "$1 - $1K", value: bin1, sub_bins: bins1, color: colors[0]}, 
            {name: "$1K - $10K", value: bin2, sub_bins: bins2, color: colors[1]}, 
            {name: "$10K - $50K", value: bin3 + bin4, sub_bins: bins3, color: colors[2]}, 
            {name: "$50K - $150K", value: bin5, sub_bins: bins5, color: colors[3]},
            {name: "$150K", value: bin6, sub_bins: bins5, color: colors[5]},  
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
        updateMap(bins);        
        sub_bin_toggle = false;
    }

    function getTiles(d) {
        var tiles = [];

        for (let i = 0; i < d.value; i++) {
            const rowNumber = Math.floor(i / tilesPerRow);
            let color;
            if (d.name == "$1 - $1K") {
                color = colors[0];
            } else if (d.name == "$1K - $10K") {
                color = colors[1];
            } else if (d.name == "$10K - $50K") {
                color = colors[2];
            } else if (d.name == "$50K - $150K") {
                color = colors[3];
            } else if (d.name == "$150K") {
                color = colors[5];
            } 
            tiles.push({
                x: (i % tilesPerRow) * tileSize,
                y: -(rowNumber + 1) * tileSize,
                bin: d.name,
                color: color
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

        u.transition()
        .delay(function(d, i) {
            return i * 10;
        })
        .style("opacity", opacity)

        u.enter()
            .append("circle")
            .style("stroke", "white")
            .style("stroke-width", "0.5")
            .merge(u)
            .style("fill", function(d) {
                return d.color;
            })
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
                // if (sub_bin_toggle) {
                //     resetChart();
                // } else {
                //     updateChart(d);
                // }

            })
            .transition()
            .delay(function(d, i) {
                return i * 10;
            })
            .style("opacity", opacity);
           
        u.exit()
            .transition()
            .delay(function(d, i) {
              return i * 10;
            })
            .style("opacity", 0)
            .on("end", function() {
              d3.select(this).remove();
            });

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
                weight: 0.2,
                fillOpacity: 0.6
                }
            },
            filter: function(feature, layer) {
                if (d.bin === "$1 - $1K") {
                    return (feature.properties.assessable_BIZAsmt <= 1000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$1K - $10K") {
                    return (feature.properties.assessable_BIZAsmt > 1000 &&feature.properties.assessable_BIZAsmt <= 10000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$10K - $50K") {
                    return (feature.properties.assessable_BIZAsmt > 10000 &&feature.properties.assessable_BIZAsmt <= 50000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$50K - $150K") {
                    return (feature.properties.assessable_BIZAsmt > 50000 &&feature.properties.assessable_BIZAsmt < 150000 && feature.properties.assessable_BIZAsmt);
                } else if (d.bin === "$150K") {
                    return (feature.properties.assessable_BIZAsmt == 150000 && feature.properties.assessable_BIZAsmt);
                } else {
                    return feature
                }
            },
            onEachFeature: mapConfig.assessmentToolTip
        }).addTo(global.geomap);

        // color function for choropleth map
        function setOrdinalColor(d) {
            if (d) {
                return  d == 150000  ? '#0B103F' :
                        d > 50000    ? '#2A316C' :
                        d > 10000    ? '#5C6298' :
                        d > 1000     ? '#B2B5D3' :
                        '#EF4060';
            } else {
                return "#888";
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
          .style("fill", "#312f2f");

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
        const yAxis = d3.axisLeft().scale(yScale).tickSize(-chartWidth);
      
        axisG.call(yAxis);

        axisG.append("text")
            .attr("y", -35)
            .attr("x", -90)
            .attr("transform", "rotate(-90)")
            .text("Number of parcels")
        

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
