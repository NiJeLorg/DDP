import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import _ from 'lodash';

const REGIONS = {
  "DETROIT": ["14000US26163520700", "14000US26163517200", "14000US26163520800"],
};
const PREFIX = 'B01001';

const RACES = {
  "Black or African American Alone": "B",
  "American Indian and Alaska Native Alone": "C",
  "Asian Alone": "D",
  "Native Hawaiian and Other Pacific Islander Alone": "E",
  "Some Other Race Alone": "F",
  "Two or More Races": "G",
  "White Alone, Not Hispanic or Latino": "H",
  "Hispanic or Latino": "I",
}
const geoIds = _.flatten(Object.values(REGIONS));
const API = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=$tableId&geo_ids=${geoIds}`;
// Sex by Age, Black or African American Alone:
const API_ONE = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001B&geo_ids=${geoIds}`;

// Sex by Age, American Indian and Alaska Native Alone:
const API_TWO = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001C&geo_ids=${geoIds}`;

// Sex by Age, Asian Alone:
const API_THREE = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001D&geo_ids=${geoIds}`;

// Sex by Age, Native Hawaiian and Other Pacific Islander Alone:
const API_FOUR = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001E&geo_ids=${geoIds}`;

// Sex by Age, Some Other Race Alone:
const API_FIVE = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001F&geo_ids=${geoIds}`;

// Sex by Age, Two or More Races:
const API_SIX = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001G&geo_ids=${geoIds}`;

// Sex by Age, White Alone, Not Hispanic or Latino:
const API_SEVEN = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001H&geo_ids=${geoIds}`;

// Sex by Age, Hispanic or Latino:
const API_EIGHT = `https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001I&geo_ids=${geoIds}`;

const MALE_DATA_COLS = _.range(3, 17);
const FEMALE_DATA_COLS = _.range(18, 32);
const COLUMNS = [
  "Under 5 years",
  "5 to 9 years",
  "10 to 14 years",
  "15 to 17 years",
  "18 and 19 years",
  "20 to 24 years",
  "25 to 29 years",
  "30 to 34 years",
  "35 to 44 years",
  "45 to 54 years",
  "55 to 64 years",
  "65 to 74 years",
  "75 to 84 years",
  "85 years and over"
];


const config = {
  colors: ['#ADC8EF', '#D5D654', '#FF9E15', '#009382', '#00A0DF'],
  chart: {
    type: 'area'
  },
  title: {
    text: 'Downtown Diversity',
    align: 'left'
  },
  xAxis: {
    categories: COLUMNS,
    // tickmarkPlacement: 'on',
    // min: 0,
    // startOnTick: true,
    title: {
      text: 'Age'
    }
  },
  yAxis: {
    title: {
      text: 'People'
    },
    min: 0,
    labels: {
      // formatter: function () {
      //   return this.value /  + 'K';
      // }
    }
  },
  tooltip: {
    shared: true,
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: '#666666'
      }
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

class DiversityAreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: config
    };
  }

  componentDidMount() {
    let API_REQS = [];
    _.forEach(RACES, (val, key) =>{
      let tableId =  PREFIX + val;
      // let req = ;
      API_REQS.push(fetch(API.replace('$tableId', tableId)).then(function (response) {
        return response.json();

      }).then(data => {
        return  {data: data, "race": key, "tableId": tableId}
      }));
    });
    // const API_ONE_JSON = fetch(API_ONE).then(function (response) {
    //   return response.json()
    // });
    // const API_TWO_JSON = fetch(API_TWO).then(function (response) {
    //   return response.json()
    // });
    // const API_THREE_JSON = fetch(API_THREE).then(function (response) {
    //   return response.json()
    // });
    // const API_FOUR_JSON = fetch(API_FOUR).then(function (response) {
    //   return response.json()
    // });
    // const API_FIVE_JSON = fetch(API_FIVE).then(function (response) {
    //   return response.json()
    // });
    // const API_SIX_JSON = fetch(API_SIX).then(function (response) {
    //   return response.json()
    // });
    // const API_SEVEN_JSON = fetch(API_SEVEN).then(function (response) {
    //   return response.json()
    // });
    // const API_EIGHT_JSON = fetch(API_EIGHT).then(function (response) {
    //   return response.json()
    // });

    Promise.all(API_REQS).then((API_RESP) => {

      // const aData1 = this.aggregateBlockData(API_ONE_RSP);
      // const aData2 = this.aggregateBlockData(API_TWO_RSP);
      // const aData3 = this.aggregateBlockData(API_THREE_RSP);
      // const aData4 = this.aggregateBlockData(API_FOUR_RSP);
      // const aData5 = this.aggregateBlockData(API_FIVE_RSP);
      // const aData6 = this.aggregateBlockData(API_SIX_RSP);
      // const aData7 = this.aggregateBlockData(API_SEVEN_RSP);
      // const aData8 = this.aggregateBlockData(API_EIGHT_RSP);
      let seriesData = [];
      _.forEach(API_RESP, (resp) => {
          // console.log(resp.data, "SOME DATa");
          let aData = this.aggregateBlockData(resp.data, resp.tableId);
        // console.log(aData, "A DATa");
          let series = {
            name: resp.race,
            data: this.getDataValue(aData)
          }
          seriesData.push(series)
      });
      console.log(seriesData, "tested");
      // let seriesData = [
      //   {
      //     name: "Black or African American Alone",
      //     data: this.getDataValue(aData1)
      //   },
      //   {
      //     name: "American Indian and Alaska Native Alone",
      //     data: this.getDataValue(aData2)
      //   },
      //   {
      //     name: "Asian Alone",
      //     data: this.getDataValue(aData3)
      //   },
      //   {
      //     name: "Native Hawaiian and Other Pacific Islander Alone",
      //     data: this.getDataValue(aData4)
      //   },
      //   {
      //     name: "Some Other Race Alone",
      //     data: this.getDataValue(aData5)
      //   },
      //   {
      //     name: "Two or More Races",
      //     data: this.getDataValue(aData6)
      //   },
      //   {
      //     name: "White Alone, Not Hispanic or Latino",
      //     data: this.getDataValue(aData7)
      //   },
      //   {
      //     name: " Hispanic or Latino",
      //     data: this.getDataValue(aData8)
      //   },
      // ];
      let configUpdated = {...this.state.config};
      config.series = seriesData;
      this.setState({config});
    }).catch((err) => {
      console.log(err);
    });
    // this.generateChartData(data);
  }


  getDataValue(data) {
    return COLUMNS.map((col) => {
      return data['DETROIT'][col];
    });
  }

  aggregateBlockData(data, tableId) {
    let regionData = {};
    _.forEach(REGIONS, (tracts, region) => {
      regionData[region] = {};
      _.forEach(MALE_DATA_COLS.concat(FEMALE_DATA_COLS), (code) => {
        // let category = '';
        // if(_.includes(MALE_DATA_COLS, code)){
        //   category = 'male';
        // }else if(_.includes(FEMALE_DATA_COLS, code)){
        //   category = 'female';
        // }
        let dataKey = tableId + code.toString().padStart(3, '0');
        let colName = data.tables[tableId]['columns'][dataKey]['name'];
        _.forEach(tracts, (tract) => {
          let tractData = data.data[tract][tableId]['estimate'];
          regionData[region][colName] = _.add(regionData[region][colName], tractData[dataKey]);

        });
      });
    });
    return regionData;
  }

  render() {

    return (
      <div>
        <ReactHighcharts config={this.state.config}/>
      </div>

    );

  }

}

export default DiversityAreaChart;