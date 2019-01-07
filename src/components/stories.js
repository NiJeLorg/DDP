import React from "react";
import StoryNavigator from "./story_navigator";
import GeoMap from "./geomap";
import DataDrawer from "./data_drawer";
import MobileNavStoryMap from "./mobile_nav_story_map";
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportingData from 'highcharts/modules/export-data';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import RailMenu from "../utils/rail_menu";

import _ from 'lodash';

HighchartsExporting(ReactHighstock.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);
HighchartsExportingData(ReactHighcharts.Highcharts);
HighchartsExportingData(ReactHighstock.Highcharts);

class Stories extends React.Component {

  setHighchartsSettings() {
    ReactHighcharts.Highcharts.setOptions(
      {
        lang: {
          thousandsSep: ','
        },
        chart: {
          style: {
            fontFamily: 'Avenir-Roman'
          }
        }
      });
  }


  constructor(props) {
    super(props);
    this.state = {
      chapter: this.props.chapter
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({chapter: nextProps.chapter})
  }





  render() {
    this.setHighchartsSettings();
    let datadrawer = "";
    let story_navigator = "";
    let geomap = "";
    let rail_menu = "";

    if (this.state.chapter.id === 1 || this.state.chapter.id === 2) {
      datadrawer = <DataDrawer/>;
      story_navigator = <StoryNavigator chapter={this.state.chapter} />;
      geomap = <GeoMap chapter={this.state.chapter}/>;
    } else if (this.state.chapter.id === 3) {
      rail_menu = <RailMenu/>;
      story_navigator = <StoryNavigator chapter={this.state.chapter} />;
    } 

    return (
      <div className="c-stories">
        {rail_menu}
        {datadrawer}
        {story_navigator}
        {geomap}
      </div>
    );
  }
}

export default Stories;
