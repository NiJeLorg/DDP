import React, {Component} from 'react';
import EducationAttainmentPieChart from './education_attainment_pie_chart';
import DataBar from './data_bar';
import Highcharts from 'highcharts';
import _ from 'lodash';
import ChartConfig from './../../utils/charts';

const DOWNTOWN_DETROIT_WAC_QUERY = 'https://services2.arcgis.com/HsXtOCMp1Nis1Ogr/arcgis/rest/services/WorkerAreaCharacteristics_2015_DetroitMSA_20180409/FeatureServer/0/query?outFields=C000,CD01,CD02,CD03,CD04&where=DtownFlag=1&returnGeometry=false&f=json';
const DETROIT_REGION_WAC_QUERY = 'https://services2.arcgis.com/HsXtOCMp1Nis1Ogr/arcgis/rest/services/WorkerAreaCharacteristics_2015_DetroitMSA_20180409/FeatureServer/0/query?outFields=C000,CD01,CD02,CD03,CD04&where=1=1&returnGeometry=false&f=json';

const CHART_CATEGORIES = {
  "C000": "Total Jobs",
  "CD01": "Less than High School",
  "CD02": "High School or Equivalent",
  "CD03": "Some College or Associate's",
  "CD04": "Bachelor's or Advanced Degree"
};

class EducationAttainmentGroupedPieChart extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      downtownDetroitSeries: [],
      totalJobsDowntown: 0,
      detroitSeries: [],
      totalDetroitRegion: 0,
    };
  }

  componentDidMount() {

    const downtownDetroit = fetch(DOWNTOWN_DETROIT_WAC_QUERY).then(function (response) {
      return response.json()
    });
    const detroit = fetch(DETROIT_REGION_WAC_QUERY).then(function (response) {
      return response.json()
    });

    Promise.all([downtownDetroit, detroit]).then(([downtownDetroitJson, detroitJson]) => {
      let aggregatedDowntown = this.aggregateData(downtownDetroitJson);
      let aggregatedDetroitRegion = this.aggregateData(detroitJson);
      this.setState({totalJobsDowntown: aggregatedDowntown['C000']});
      this.setState({totalDetroitRegion: aggregatedDetroitRegion['C000']});
      delete aggregatedDowntown['C000'];
      delete aggregatedDetroitRegion['C000'];
      const aData = this.mapAggregatedDataToCategories(aggregatedDowntown);
      const dData = this.mapAggregatedDataToCategories(aggregatedDetroitRegion);

      this.setState({downtownDetroitSeries: aData});
      this.setState({detroitSeries: dData});
    }).catch((err) => {
      console.log(err);
    });
  }

  mapAggregatedDataToCategories(aData) {
    let mappedData = [];
    _.forEach(aData, function(value, key) {
        mappedData.push({
          name: CHART_CATEGORIES[key],
          y: value
        });

    });
      return mappedData;
  }

  aggregateData(data) {
      let aggregateData = {
        "C000": 0,
        "CD01": 0,
        "CD02": 0,
        "CD03": 0,
        "CD04": 0
      };
      _.forEach(data.features, (dataPoint) => {
        _.forEach(dataPoint.attributes, (val, key) => {
          aggregateData[key] += val;
        });
      });
      return aggregateData;
  }
  render () {
    return (

      <div>
        <div className="chart-container">
          <div className="grouped-pie-chart">
            <EducationAttainmentPieChart legend={false} title={"DOWNTOWN"} total={this.state.totalJobsDowntown} config={_.cloneDeep(ChartConfig.PIE_CHART_CONFIG)} series={this.state.downtownDetroitSeries}/>
            <EducationAttainmentPieChart legend={false} title={"THE REGION"} total={this.state.totalDetroitRegion} config={_.cloneDeep(ChartConfig.PIE_CHART_CONFIG)} series={this.state.detroitSeries}/>
          </div>
          <DataBar/>
        </div>
        <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
      </div>

    );
  }

};

export default EducationAttainmentGroupedPieChart;