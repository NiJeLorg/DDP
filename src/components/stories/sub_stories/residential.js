import React, {Component} from 'react';
import ResidentialUnitsBarChart from  './../../charts/residential_bar_chart';
import { getResidentialUnitsData } from './../../../services/api';
class Residential  extends Component {


  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }

  }

  componentDidMount(){
    getResidentialUnitsData().then(resp => {
      this.setState({data: resp})
    });
  }

  render() {
    return (
      <div className='story-margin'>
        <h1 className="sub-sub-heading__purple" data-story-id="3" data-story-overlay="Live Downtown"><span className='ul-yellow-color'>3.</span>LIVE DOWNTOWN</h1>
        <p className='main-text__black'>Downtown Detroit is a sought-after place to live and residential units are in high-demand. Use the tools here to identify places to live. There are many residential units to look through and here are some tools to help you find a place to live (Live Detroit info). Also, there is also a wave of new development in the pipeline that are on track to address the high demand.
        </p>
        <ResidentialUnitsBarChart data={this.state.data}/>
      </div>
    );
  }

};

export default Residential;