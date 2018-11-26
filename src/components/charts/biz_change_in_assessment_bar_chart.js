import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import _ from 'lodash';
import DataBar from './data_bar';



const config = {
  colors: ['#F27B21', '#00B3EE'],
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
    pointFormat: '<span>Percent Change</span>: <b>{point.y}%</b><br/>',
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
      format: '{value:,.0f}%'
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

class BIZChangeInAssessmentBarChart extends Component {
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
      let tableRow = {Category: "Percent Change"};
      Object.keys(nextProps.data).map(key => {
        tableRow[key] = nextProps.data[key].toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + "%";
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
        <span className="chart-header">Change in Assessed Value and BIZ Assessement Since 2014-15</span>
        <div className="chart-container">
          <ReactHighcharts config={this.state.config} ref="chart"/>
          <DataBar config={this.state.config2} />
        </div>
      </div>

    );

  }

}

export default BIZChangeInAssessmentBarChart;