import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import _ from 'lodash';

const DATA_CATEGORIES = {
  // "Less than 20,000": {0: ["004", "026"], 1: ["005", "027"], 2: ["006", "028"]},
  "20,000 - 34,999": {0: ["008", "030"], 1: ["009", "031"], 2: ["010", "032"]},
  "35,000 - 49,999": {0: ["012", "034"], 1: ["013", "035"], 2: ["014", "036"]},
  "50,000 - 74,999": {0: ["016", "038"], 1: ["017", "039"], 2: ["018", "040"]},
  "75,000 or more": {0: ["020", "042"], 1: ["021", "043"], 2: ["022", "044"]}
};

const ORDERED_CATEGORIES = ["20,000 - 34,999", "35,000 - 49,999", "50,000 - 74,999", "75,000 or more"];
const labels = {
  0: "Less than 20%",
  1: "20-29%",
  2: "30% or more",
};

const REGIONS = {
  "DETROIT": ["14000US26163520700", "14000US26163517200", "14000US26163520800"]
};
const PREFIX = 'B25106';

const API = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25106&geo_ids=14000US26163520700,14000US26163517200,14000US26163520800`;

const config = {
  colors: ['#00A0DF', '#D5D654', '#FF9E15', '#009382','#ADC8EF'],
  xAxis: {
    categories: ORDERED_CATEGORIES
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
  tooltip: {
    pointFormat: '<span>{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
    // shared: true,
    useHTML: true,
    borderColor: null,
    followPointer: true,
  },
  plotOptions: {
    column: {
      stacking: 'percent'
    }
  },
  series: []
};

class IncomeBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: config,
      data: []
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then((data) => {
        let config = Object.assign({}, this.state.config);    //creating copy of object
        config.series = this.generateChartData(data);
        this.setState({config});
      });
  }

  generateChartData(data) {
    let regionData = {};
    _.forEach(REGIONS, (tracts, region) => {
      regionData[region] = {};
      _.forEach(DATA_CATEGORIES, (series, category) => {
        regionData[region][category] = {};
        _.forEach(tracts, (tract) => {
          let tractData = data.data[tract][PREFIX]['estimate'];
          _.forEach(series, (codes, key) => {
            _.forEach(codes, (code)=> {
              regionData[region][category][key]= _.add(tractData[PREFIX+code])
            });
          });
        });
      });
    });

    console.log(regionData);
    let seriesData = [];

    _.forEach(Object.keys(labels).sort(), (key) => {

      let series = { name: labels[key], data: []};
      _.forEach(ORDERED_CATEGORIES, (category) => {
        series.data.push(regionData['DETROIT'][category][key]);
      });
      seriesData.push(series);
    });
    return seriesData;
  }

  render() {

    return (
      <div>
        <ReactHighcharts config={this.state.config} ref="chart"/>
      </div>

    );

  }

}

export default IncomeBarChart;