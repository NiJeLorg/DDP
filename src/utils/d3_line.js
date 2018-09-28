import * as d3 from 'd3'; 

const D3Line = {};

D3Line.create = (el, data, config) => {
    console.log(el);
    console.log(data);

    // Setup chart dimensions and margins
		const margin = { top: 20, right: 20, bottom: 35, left: 60 };
		//const width = parseInt(d3.select('.c-table__1_3_column').style('width'), 10) - margin.left - margin.right;
		const width = 300 - margin.left - margin.right;
		const height = 200 - margin.top - margin.bottom;

		// Setup scales
		const x = d3.scaleLinear().range([0, width]);
		const y = d3.scaleLinear().range([height, 0]);

    // Get x,y extents
		const xMax = Math.abs(d3.max(data, function(d) { return d.x; }))
    const yMax = Math.abs(d3.max(data, function(d) { return d.y; }))

    // Set x,y domains
		x.domain([0, xMax/config.x_domain_normalize]);
		y.domain([0, yMax]);


		// Setup line generator
		const line = d3.line()
			.x(function (d) { return x(d.x); })
      .y(function (d) { return y(d.y); });
      

	  // Setup svg element
    let svg = d3.select(el).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	  // Create axes
    svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).ticks(3, config.x_axis_format));

    svg.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(0, 0)')
        .call(d3.axisLeft(y).ticks(3, "$.0s"));

    // label axes
    const label_height = height + 30;
    svg.append("text")
        .attr('transform', 'translate(' + width/2 + ',' + label_height + ')')
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(config.x_axis_text);

    svg.append("text")
        .attr('transform', 'translate(-45,' + height/2 + '), rotate(-90)')
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Assessment ($)");

		// JOIN
		let paths = svg.selectAll('path.line')
				.data([data]);

		// ENTER
		paths.enter().append('path')
				.attr('class', 'line')
				// ENTER + UPDATE
				.merge(paths)
				.transition()
				.duration(500)
				.attr('d', line);

};

D3Line.update = (el, data, configuration, chart) => {
    // D3 Code to update the chart
};

D3Line.destroy = () => {
    // Cleaning code here
};

export default D3Line;
