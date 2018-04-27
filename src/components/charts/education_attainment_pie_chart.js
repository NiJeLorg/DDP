import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';



class EducationAttainmentPieChart extends Component {
  constructor(props) {
    super(props);

    if(props.legend){
      props.config.legend.enabled = true;
    }else{
      props.config.legend.enabled = false;
    }
    props.config.title.text = props.title;

    this.state = {
      config: props.config
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.series.length > 0){
      console.log(nextProps.series, "PROS");
      var config = {...this.state.config};
      config.subtitle.text =`${nextProps.total} total workers`;
      config.series = [{
        name: 'Education Level',
        colorByPoint: true,
        data:nextProps.series
      }];
      this.setState({config});
      console.log(config, "NEW CONFIG");
    }

    // this.setState({ data: nextProps.series });
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