import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import _ from 'lodash';
import ChartConfig from './../../utils/charts';


class IncomeAreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: _.clone(ChartConfig.AREA_CHART_CONFIG)
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== undefined){
      let config = {...this.state.config};
      config.title.text =`${nextProps.title}`;
      config.colors = [nextProps.color];
      if( nextProps.yScale > 0){
        config.yAxis['max'] = nextProps.yScale * 1000;
      }

      config.series = [{
        showInLegend: false,
        name: nextProps.title,
        data: this.getValuesSortedByKey(nextProps.data)
      }];
      this.setState({config});
    }
  }

  getValuesSortedByKey (data) {
    const sortedDates = Object.keys(data).sort();
    return sortedDates.map((date) => {
      return data[date];
    })
  }
  render() {

    return (
        <div>
          <ReactHighcharts config={this.state.config}/>
        </div>


    );

  }

}

export default  IncomeAreaChart;