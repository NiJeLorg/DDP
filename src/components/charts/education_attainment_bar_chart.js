import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import _ from 'lodash';

const REGIONS = {
  "DOWNTOWN DETROIT": ["14000US26163520700", "14000US26163517200", "14000US26163520800"],
  "DOWNTOWN DENVER": ["14000US08031001702", "14000US08031001701"],
  "DOWNTOWN PITTSBURGH": ["14000US42003020100"],
  "DOWNTOWN BALTIMORE": ["14000US24510040100", "14000US24510220100"]
};
const PREFIX = 'B15003';
const DATA_CATEGORIES = {
  "Post Grad": ['023', '024', '025'],
  "Bachelor's": ['022'],
  "Some College": ['019', '020'],
  "High School": ['017', '018'],
  "No Degree": ['016'],
};
const geoIds = _.flatten(Object.values(REGIONS));
const API = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B15003&geo_ids=${geoIds}`;

const config = {
  colors: ['#00A0DF', '#D5D654', '#FF9E15', '#009382', '#ADC8EF'],
  xAxis: {
    categories: Object.keys(REGIONS)
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
    // width: 400,
    // height: 250,
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

class EducationAttainmentBarChart extends Component {
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
      _.forEach(DATA_CATEGORIES, (codes, category) => {
        regionData[region][category] = 0;
        _.forEach(tracts, (tract) => {
          let tractData = data.data[tract][PREFIX]['estimate'];
          _.forEach(codes, (code) => {
            regionData[region][category] = _.add(regionData[region][category], tractData[PREFIX + code]);
          })

        });
      });
    });
    const seriesData = Object.keys(DATA_CATEGORIES).map(category => {
      let data = Object.keys(REGIONS).map(region => {
        return regionData[region][category];
      });
      return {name: category, data: data};
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

export default EducationAttainmentBarChart;