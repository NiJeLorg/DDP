import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
const config = {
    colors: ['#ADC8EF','#D5D654','#FF9E15','#009382','#00A0DF'],
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: null
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
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
        // positioner: function(labelWidth, labelHeight, point){
        //     return {x:point.plotX + 40,y:point.plotY};
        // }
    },
    series: [{
        name: 'Education Level',
        colorByPoint: true,
        data: [{
            name: 'No Degree',
            y: 56.33
        }, {
            name: 'High School',
            y: 24.03,
        }, {
            name: 'Some College',
            y: 10.38
        }, {
            name: 'Bachelors',
            y: 4.77
        }, {
            name: 'Post Grad',
            y: 0.91
        }]
    }]
};

class EducationAttainmentPieChart extends Component {
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

export default EducationAttainmentPieChart;