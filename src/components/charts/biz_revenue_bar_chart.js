import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import _ from 'lodash';
import DataBar from './data_bar';
import * as d3 from 'd3';



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
    buttons: {
      contextButton: {
        menuItems:['downloadJPEG', 'downloadPNG', 'downloadCSV', 'downloadXLS', 'downloadPDF']
      }
    },
    fallbackToExportServer: false
  },
  tooltip: {
    pointFormat: '<span>BIZ Assessment</span>: <b>${point.y}</b><br/>',
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
    },
    labels: {
      formatter: function () {
        return  '$' + this.value / 1000000 + 'M';
      }
    },
    min: 0
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

class BIZRevenueBarChart extends Component {
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
      let config2 = {...this.state.config};
      // config.title.text =`${nextProps.title}`;
      // config.colors = [nextProps.color];
      // if( nextProps.yScale > 0){
      //   config.yAxis['max'] = nextProps.yScale * 1000;
      // }
      config.xAxis.categories = Object.keys(nextProps.data).sort();
      config.series = [{
        showInLegend: false,
        data: this.getValuesSortedByKey(nextProps.data),
      }];
      config2.series = [];
      let tableRow = {Category: "BIZ Assessment"};
      Object.keys(nextProps.data).map(key => {
        tableRow[key] = '$' + nextProps.data[key].toLocaleString(navigator.language, { minimumFractionDigits: 0 });
      });
      config2.series.push({tableRow: tableRow});
      
      this.setState({config});
      this.setState({config2});
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
        <span className="chart-header">BIZ Assessment Changes Since 2014</span>
        <div className="chart-container">
          <ReactHighcharts config={this.state.config} ref="chart"/>
          <DataBar config={this.state.config2} />
        </div>
      </div>

    );

  }

}

export default BIZRevenueBarChart;
