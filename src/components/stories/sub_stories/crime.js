import React, {Component} from 'react';
import _ from 'lodash';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import CrimeAreaChart from '../../charts/crime_area_chart';
import DataBar from './../../charts/data_bar';
import {generateDateRanges} from '../../../utils/app';

const moment = extendMoment(Moment);
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const START_DATE = '2017-01-01';
const END_DATE = moment().format('YYYY-MM-DD').toString();
const VALID_CENSUS_TRACTS_IDS = ["26163520800", "26163520700", "26163517200"];
const VALID_CRIME_CATEGORIES = ["AGGRAVATED ASSAULT", "ASSAULT", "BURGLARY", "HOMICIDE", "LARCENY", "ROBBERY", "SEXUAL ASSAULT", "STOLEN VEHICLE"];

class Crime extends Component {


  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }

  componentDidMount() {
    this.getCrimeData();
  }


  generateFetchReq() {
    let API = "https://mdda.azure-api.net/api/567b-f2cf?$select=census_tract_geo_id,offense_category,Count&$filter=incident_datetime+ge+datetime'$start'+and+incident_datetime+le+datetime'$end'&$groupby=offense_category,census_tract_geo_id";
    const dateRanges = generateDateRanges(START_DATE, END_DATE);
    let API_REQS = [];
    for (let monthStart of dateRanges) {
      let end = moment(monthStart).endOf('month').format('YYYY-MM-DD');
      API_REQS.push(
        fetch(proxyUrl + API.replace('$start', monthStart).replace('$end', end)).then(function (response) {
          return response.json();
        }).then(data => {
          return {data: data, "month_start": monthStart, "month_end": end};
        })
      );
    }
    return API_REQS
  }

  getCrimeData() {
    Promise.all(this.generateFetchReq()).then((API_RESP) => {
      const filteredData = API_RESP.map(data => {
        return this.filterCrimeData(data);
      });
      const chartData = this.generateChartData(filteredData);
      this.setState({chartData});
    }).catch((err) => {
      console.log(err);
    });
  }

  filterCrimeData(dataset) {
    dataset.data.value = dataset.data.value.filter(data => {
      return _.includes(VALID_CENSUS_TRACTS_IDS, data.census_tract_geo_id) && _.includes(VALID_CRIME_CATEGORIES, data.offense_category);
    });
    return dataset;
  }

  generateChartData(dataset) {
    let chartData = {};
    _.forEach(dataset, (data) => {
      _.forEach(data.data.value, (val) => {
        if (!_.has(chartData, val.offense_category)) {
          chartData[val.offense_category] = {};
        }
        chartData[val.offense_category][data.month_start] = _.add(chartData[val.offense_category][data.month_start], val.Count);
      })
    });

    let formattedSeries = [];
    _.forEach(chartData, (data, category) => {
      let d = [];
      _.forEach(data, (v, k) => {
        d.push([moment(k, 'YYYY-MM-DD').valueOf(), v]);
      });
      formattedSeries.push({
        name: category,
        data: d,
        showInNavigator: true
      })
    });
    return formattedSeries
  }

  render() {
    return (
      <div className={"fill-height"}>
        <h1 className="sub-sub-heading__purple" data-story-id="5" data-story-overlay="Crime"><span className='ul-yellow-color'>V.</span>Safety</h1>
        <p className='main-text__black'>Downtown Detroit is a thriving neighborhood and very safe place to be overall,
          though there is room for improvement. As in all urban areas, it is important to take sensible safety
          precautions while Downtown, like not leaving valuables visible in cars and being aware of your surroundings.
          With supplemental security, coordination with the Detroit Police, a coalition of companies offering safe
          havens and Business Improvement Zone Ambassadors walking the streets, the Downtown Detroit Partnership is
          working to make Downtown as safe as possible. The graphs below show how Downtown Detroit is doing overall.
        </p>
        <div>
          <span className="chart-header">2017 MDDA CRIME DISTRIBUTION</span>
          <div className="chart-container">
            <CrimeAreaChart data={this.state.chartData}/>
            <DataBar/>
          </div>

        </div>


      </div>
    );
  }

}

export default Crime;