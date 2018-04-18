import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
const config = {
    colors: ['#ADC8EF','#D5D654','#FF9E15','#009382','#00A0DF'],
    chart: {
        type: 'area'
    },
    title: {
        text: 'Downtown Diversity',
        align: 'left'
    },
    xAxis: {
        categories: ['0-20', '20-40', '40-60', '60-80', '80-100'],
        // tickmarkPlacement: 'on',
        // min: 0,
        startOnTick: true,
        title: {
            text: 'Age'
        }
    },
    yAxis: {
        title: {
            text: 'People'
        },
        min: 0,
        labels: {
            formatter: function () {
                return this.value/1000 + 'K';
            }
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' millions'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
        name: 'Black',
        data: [502, 635, 809, 947, 1402,]
    }, {
        name: 'White',
        data: [106, 107, 111, 133, 221]
    }, {
        name: 'Hispanic',
        data: [163, 203, 276, 408, 547]
    }, {
        name: 'Mixed Race',
        data: [18, 31, 54, 156, 339]
    }, {
        name: 'Asian',
        data: [2, 2, 2, 6, 13]
    }],
    legend: {
        verticalAlign: 'top',
        y: -20,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        symbolRadius: 0
    },

};

class DiversityAreaChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: config
        };
    }


    render() {

        return (
            <div>
                <ReactHighcharts config={this.state.config}/>
            </div>

        );

    }

}

export default DiversityAreaChart;