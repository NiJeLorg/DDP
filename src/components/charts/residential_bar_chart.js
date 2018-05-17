import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import _ from 'lodash';
import DataBar from './data_bar';



const config = {
  colors: ['#2A316C'],
  xAxis: {
    categories: []
  },
  exporting: {
    chartOptions: { // specific options for the exported image
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      }
    },
    fallbackToExportServer: false
  },
  tooltip: {
    pointFormat: '<span>Projected Housing Units:</span>: <b>{point.y}</b><br/>',
    // shared: true,
    useHTML: true,
    borderColor: null,
    followPointer: true,
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'column',
  },
  title: {
    text: null
  },
  yAxis: {
    title:{
      enabled: false
    }
  },
  legend: {
    verticalAlign: 'top',
    itemDistance: 10,
    itemWidth: 100,
    align: 'left',
    y: -25,
    itemStyle: {
      textOverflow: null
    },
    itemMarginBottom: 4,
    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
    symbolRadius: 0
  },


  series: [
    { data: []}
  ]
};

class ResidentialUnitsBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: config,
      data: [],
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== undefined){
      let config = {...this.state.config};
      // config.title.text =`${nextProps.title}`;
      // config.colors = [nextProps.color];
      // if( nextProps.yScale > 0){
      //   config.yAxis['max'] = nextProps.yScale * 1000;
      // }
      config.xAxis.categories = Object.keys(nextProps.data).sort();
      config.series = [{
        showInLegend: false,
        data: this.getValuesSortedByKey(nextProps.data)
      }];
      this.setState({config});
    }
  }

  getValuesSortedByKey (data) {
    const sortedDates = Object.keys(data).sort();
    return sortedDates.map((idx) => {
      return data[idx];
    })
  }

  render() {

    return (
      <div>

        <div className="chart-container">
          <ReactHighcharts config={this.state.config} ref="chart"/>
          <DataBar chart={this.state.chart}/>
        </div>
        <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
      </div>

    );

  }

}

export default ResidentialUnitsBarChart;