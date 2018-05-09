import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
const ReactHighstock = require('react-highcharts/ReactHighstock.src');


const config = {
  colors: ['#f15c80',  '#00A0DF','#D5D654','#FF9E15', '#009382', '#ADC8EF', '#334346', '#90ED7D'],
  chart: {
    type: 'area',
    zoomType: 'x'
  },
  rangeSelector: {
    enabled: false,
    inputEnabled: false
  },
  title: {
    text: null,
  },
  scrollbar: {
    enabled: false
  },
  navigator: {
    maskFill: "rgba(183,190,200,0.3)",
    handles: {
      backgroundColor: 'yellow',
      borderColor: 'red'
    }
  },
  xAxis: {
    type: 'datetime',
    labels: {
      format: '{value:%Y-%m-%d}'
    },
    tickInterval: 3 * 30 * 24 * 3600 * 1000,
    minRang: 1 * 30 * 24 * 3600 * 1000,
    events: {
      afterSetExtremes: function(event){
        if (event.max < this.getExtremes().dataMax || event.min > this.getExtremes().dataMin) {
          this.update({
            tickInterval: 1 * 30 * 24 * 3600 * 1000
          });
        } else {
          this.update({
            tickInterval: 3 * 30 * 24 * 3600 * 1000
          });
        }
      }
  }},
  yAxis: {
    opposite:false,
    title: {
      text: "Incidents"
    }
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        showInNavigator: true
      }
    },
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1
    }
  },
  series: [],
  legend: {
    verticalAlign: 'top',
    y: -20,
    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
    symbolRadius: 0
  },

};

class CrimeAreaChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: config
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== undefined){
      let config = {...this.state.config};
      config.series = nextProps.data;
      this.setState({config});
    }

  }


  render() {

    return (
      <div>
        <ReactHighstock config={this.state.config}/>
      </div>

    );

  }

}

export default CrimeAreaChart;