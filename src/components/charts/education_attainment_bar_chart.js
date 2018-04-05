import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import DataBar from './data_bar';

const config = {
    colors: ['#ADC8EF','#D5D654','#FF9E15','#009382','#00A0DF'],
    xAxis: {
        categories: ['DETROIT', 'CHICAGO', 'PITTSBURGH', 'BALTIMORE']
    },
    chart: {
        type: 'column',
    },
    title:{
        text: null
    },
    yAxis: {
        min: 0,
        tickInterval: 25,
        title: {
            text: null
        },
        labels: {
            format: '{value}%'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        verticalAlign: 'top',
        y: -25,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        symbolRadius: 0
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true,
        useHTML: true,
        borderColor: null,
        followPointer: true,
        positioner: function(labelWidth, labelHeight, point){
            return {x:point.plotX + 40,y:point.plotY};
        }
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        index:0,
        name: 'No Degree',
        data: [5, 3, 4, 7]
    }, {
        index:1,
        name: 'High School',
        data: [2, 2, 3, 2]
    }, {
        index:2,
        name: 'Some College',
        data: [3, 4, 4, 2]
    }, {
        index:3,
        name: 'Bachelors',
        data: [3, 4, 4, 2]
    }, {
        index:4,
        name: 'Post Grad',
        data: [3, 4, 4, 2]
    }]
};

class EducationAttainmentBarChart extends Component {
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

export default EducationAttainmentBarChart;