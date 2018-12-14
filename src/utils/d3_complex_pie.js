import * as d3 from 'd3'; 

const D3ComplexPie = {};

D3ComplexPie.create = (el, overallBudgetData, programBudgetData, config) => {
    console.log(overallBudgetData);
    console.log(programBudgetData);

    // calculate total overall budget for use later to calculate percentages
    let totalBudget = 0;
    for (let index = 0; index < overallBudgetData.length; index++) {
        totalBudget = totalBudget + overallBudgetData[index].budget;
    }

    // Setup chart dimensions and margins
    const margin = { top: 20, right: 20, bottom: 35, left: 60 };
    const width = Math.min(parseInt(d3.select('#BIZBudgetChartDiv').style('width')) - margin.left - margin.right, 800);
    //const width = 300 - margin.left - margin.right;
    const height = Math.min(width, 500);

    // admin pie

    // Setup pie generator
    const pie = d3.pie()
        .sort(null)
        .value(d => d.budget);

    const adminArc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 8 - 1);
    
    const adminArcs = pie(overallBudgetData);
    
    const adminRadius = Math.min(width, height) / 8 * 1.4;
        
    const adminArcLabel = d3.arc().innerRadius(adminRadius).outerRadius(adminRadius);

    const adminColor = d3.scaleOrdinal() // colors for smaller pie chart
        .domain(overallBudgetData.map(d => d.name))
        .range(["#00a892", "#00b3ee", "#2a316c"])


	// Setup svg element
    const svg = d3.select(el).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const adminG = svg.append("g")
        .attr("transform", 'translate(' + width / 6 + ', ' + height / 4 + ')')
        .attr("text-anchor", "middle")
        .style("font", "12px \"Avenir-Roman\"");

    adminG.selectAll("path")
        .data(adminArcs)
        .enter().append("path")
          .attr("fill", function (d) { 
              return adminColor(d.data.name); 
          })
          .attr("stroke", "white")
          .attr("d", adminArc)
          .append("title")
          .text(d => `${d.data.name}: ${d.data.budget.toLocaleString('us-US', { style: 'currency', currency: 'USD' }).slice(0, -3)}`);

    const adminText = adminG.selectAll("text")
          .data(adminArcs)
          .enter().append("text")
            .attr("transform", d => `translate(${adminArcLabel.centroid(d)})`)
            .attr("dy", "0.35em");
        
    adminText.append("tspan")
        .attr("x", function (d) { 
            if (d.data.name === 'BIZ direct expenses') {
                return '2.5em';
            } else {
                return 0;
            }
        })
        .attr("y", "-0.7em")
        .style("font-weight", "bold")
        .text(d => d.data.name);
    
    adminText.append("tspan")
        .attr("x", function (d) { 
            if (d.data.name === 'BIZ direct expenses') {
                return '2.5em';
            } else {
                return 0;
            }
        })
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(function (d) { 
            const budget = d.data.budget.toLocaleString('us-US', { style: 'currency', currency: 'USD' }).slice(0, -3);
            const percent = ((d.data.budget / totalBudget) * 100).toFixed(1) + '%';
            return budget + ' (' + percent + ')';
        });
        

    // program budget pie
    // constants
    const pbArc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 3 - 1);
    
    const pbArcs = pie(programBudgetData);
    
    const pbinnerRadius = Math.min(width, height) / 3 * 0.2;
    const pbouterRadius = Math.min(width, height) / 3 * 0.8;
        
    const pbArcLabel = d3.arc().innerRadius(pbinnerRadius).outerRadius(pbouterRadius);

    const pbColor = d3.scaleOrdinal()
        .domain(programBudgetData.map(d => d.name))
        .range(["#ADC7EE", "#7180B9", "#94B0DA", "#4049a8", "#363f94", "#41B1EC", "#A0DDFF"]) //larger pie chart


    const pbG = svg.append("g")
        .attr("transform", 'translate(' + width / 2.2 + ', ' + height / 1.5 + ')')
        .attr("text-anchor", "middle")
        .style("font", "12px \"Avenir-Roman\"");

    pbG.selectAll("path")
        .data(pbArcs)
        .enter().append("path")
          .classed("slices", true)
          .attr("id", function (d, i) { 
            return "slice_" + i; 
          }) 
          .attr("fill", function (d) { 
              return pbColor(d.data.name); 
          })
          .style("opacity", 1) 
          .style("cursor", "pointer")
          .attr("stroke", "white")
          .attr("d", pbArc)
          .on("mouseover", function (d, i) {
            d3.selectAll('.slices').transition().duration(500).style("opacity", 0.3);   
            d3.select(this).transition().duration(500).style("opacity", 1); 
            d3.select("#chart-tooltip")
                .style("left", (d3.event.layerX + 50) + "px")
                .style("top", (d3.event.layerY - 50) + "px")
                .classed("hidden", false);

            d3.select("#tooltip-category")
                .text(d.data.name);
            
            d3.select("#tooltip-budget")
                .text(d.data.budget.toLocaleString('us-US', { style: 'currency', currency: 'USD' }).slice(0, -3));

            d3.selectAll('.legend').transition().duration(500).style("opacity", 0.3);
            const thisLegend = d3.select("#legend_"+i)
                .transition().duration(500).style("opacity", 1);

            thisLegend.select('circle')
                .attr("stroke", "black")
                .attr("stroke-width", "2px"); 


          })
          .on("mousemove", function (d) {
            d3.select("#chart-tooltip")
                .style("left", (d3.event.layerX + 50) + "px")
                .style("top", (d3.event.layerY - 50) + "px");
          })
          .on("mouseout", function () {
            d3.selectAll('.slices').transition().duration(500).style("opacity", 1); 
            // Hide the tooltip
            d3.select("#chart-tooltip")
                .classed("hidden", true);
            // reset legend
            d3.selectAll('.legend').transition().duration(500).style("opacity", 1);
          })
          .on("click", function (d) {
            const modal = d3.select("#chart-modal")
                .classed("hidden", false); 

            d3.select("#modal-type")
                .text(d.data.type);

            d3.select("#modal-category")
                .text(d.data.name);
            
            d3.select("#modal-budget")
                .text(d.data.budget.toLocaleString('us-US', { style: 'currency', currency: 'USD' }).slice(0, -3));

            d3.select("#modal-description")
                .text(d.data.description);

            d3.select("#modal-categories")
                .selectAll("li")
                .data(d.data.categories)
                .enter()
                .append("li")
                .text(function(value) {
                    return value.name
                });

            d3.select("#close")
                .on("click", function () {
                    modal.classed("hidden", true);
                });
                
          });

    // legend for the graph
    const legendRectSize = 18;
    const legendSpacing = 4;
    const legendG = svg.append("g")
        .attr("transform", 'translate(' + width / 1.3 + ', ' + height / 1.5 + ')')
        .style("font", "12px \"Avenir-Roman\"");

    const legend = legendG.selectAll('.legend')
        .data(pbColor.domain())
        .enter()
        .append('g')
        .classed("legend", true)
        .attr("id", function (d, i) { 
            return "legend_" + i; 
        }) 
        .attr('transform', function(d, i) {                     
            const legendHeight = legendRectSize + legendSpacing + 5;          
            const offset =  legendHeight * pbColor.domain().length / 2;     
            var horz = -2 * legendRectSize;                       
            var vert = i * legendHeight - offset;                       
            return 'translate(' + horz + ',' + vert + ')';        
        })
        .on("mouseover", function (d, i) {
            d3.selectAll('.legend').transition().duration(500).style("opacity", 0.3);
            d3.select(this).transition().duration(500).style("opacity", 1);

            d3.selectAll('.slices').transition().duration(500).style("opacity", 0.3);
            d3.select("#slice_"+i)
                .transition().duration(500).style("opacity", 1);
                 
        })
        .on("mouseout", function () {
            d3.selectAll('.legend').transition().duration(500).style("opacity", 1);
            d3.selectAll('.slices').transition().duration(500).style("opacity", 1);
        }); 

    legend.append('circle')                                     
        .attr('r', legendRectSize/2)  
        .attr("cy", legendRectSize/2)                       
        .style('fill', pbColor)                                   
        .style('stroke', pbColor);                                

    legend.append('text')                                     
        .attr('x', legendRectSize + legendSpacing)              
        .attr('y', legendRectSize - legendSpacing)              
        .text(function(d) { return d; });                       



};

D3ComplexPie.update = (el, overallBudgetData, programBudgetData, configuration, chart) => {
    // D3 Code to update the chart
};

D3ComplexPie.destroy = () => {
    // Cleaning code here
};

export default D3ComplexPie;
