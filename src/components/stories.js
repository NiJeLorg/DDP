import React from "react";
import StoryNavigator from "./story_navigator";
import GeoMap from "./geomap";
import DataDrawer from "./data_drawer";
import MobileNavStoryMap from "./mobile_nav_story_map";
import ReactHighcharts from 'react-highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportingData from 'highcharts/modules/export-data';
import ReactHighstock from 'react-highcharts/ReactHighstock';
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
  }

  componentWillReceiveProps(nextProps) {

    this.setState({chapter: nextProps.chapter})
  }

  render() {
    this.setHighchartsSettings();
    return (
      <div className="c-stories">
        <DataDrawer />
        <StoryNavigator chapter={this.props.chapter} />
        <GeoMap chapter={this.props.chapter} />
      </div>
    );
  }
}

export default Stories;
