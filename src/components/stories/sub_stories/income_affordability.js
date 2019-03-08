import React, {Component} from 'react';
import DataBar from './../../charts/data_bar';
import classNames from 'classnames';
import gsjson from 'google-spreadsheet-to-json';
import _ from 'lodash';
import IncomeAreaChart from './../../charts/income_area_chart';
import {Link} from 'react-router-dom';
import IncomeBarChart from './../../charts/income_bar_chart';

const categories = {
  "MEDIAN HOUSEHOLD INCOME": 0,
  "OWNER VALUE": 1,
  "RENT": 2
};
const category_scale = {
  "MEDIAN HOUSEHOLD INCOME": 150,
  "OWNER VALUE": 450,
  "RENT": 1.5
};

const DEFAULT_MAX_SCALE = 150;

class IncomeAffordability extends Component {


  constructor(props) {
    super(props);
    this.state = {
      detroit: [],
      denver: [],
      baltimore: [],
      pittsburgh: [],
      data: [],
      activeCategory: 'MEDIAN HOUSEHOLD INCOME',
      maxYScale: DEFAULT_MAX_SCALE,
      config: {},
    };
  }

  componentDidMount() {
    gsjson({
      spreadsheetId: '1tCjhTClMG93iMB43Zf4vm7JnuDqSnCPy5GkylEeBf0w',
      worksheet: ['Average Household Income', 'Owner Value', 'Rent']
      // other options...
    })
      .then((result) => {
        this.setState({data: result});
        this.updateAreaCharts(this.state.data[categories[this.state.activeCategory]]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateAreaCharts(categoryData) {
    let seriesData = [];
    _.forEach(categoryData, (dataset) => {
      let tableRow = {Category: dataset.downtown};
      // console.log(tableRow);
      for (var key in dataset) {
        if (key !== "downtown") {
          tableRow[key] = "$" + dataset[key].toLocaleString(navigator.language, { maximumFractionDigits: 0 });
        } 
      }

      if (dataset.downtown.toLowerCase() === 'detroit') {
        this.setState({detroit: this.generateSeriesData(dataset)})
      } else if (dataset.downtown.toLowerCase() === 'denver') {
        this.setState({denver: this.generateSeriesData(dataset)})
      }
      else if (dataset.downtown.toLowerCase() === 'baltimore') {
        this.setState({baltimore: this.generateSeriesData(dataset)})
      }
      else if (dataset.downtown.toLowerCase() === 'pittsburgh') {
        this.setState({pittsburgh: this.generateSeriesData(dataset)})
      }
      let series = {
        tableRow: tableRow,
      }
      seriesData.push(series)  
    });
    let config = Object.assign({}, this.state.config);    //creating copy of object
    config.series = seriesData;
    // console.log(config);
    this.setState({config});
  }

  generateSeriesData(dataset) {
    let series = _.clone(dataset);
    delete series.downtown;
    return series;
  }

  switchCategory(category) {
    this.setState({activeCategory: category});
    this.setState({maxYScale: category_scale[category]});
    this.updateAreaCharts(this.state.data[categories[category]]);
  }

  render() {
    let btn1 = classNames({
      'active': this.state.activeCategory === 'MEDIAN HOUSEHOLD INCOME'
    });

    let btn2 = classNames({
      'active': this.state.activeCategory === 'OWNER VALUE'
    });

    let btn3 = classNames({
      'active': this.state.activeCategory === 'RENT'
    });
    return (
      <div className='story-margin'>
        <h1 className="sub-sub-heading__purple" data-story-id="4" data-story-overlay="Affordability">Downtown Affordability
        </h1>
        <p className='main-text__black'>Downtown Detroit is a desirable place to live and work, and the market price for
          housing is increasing because of it. As in most downtowns, there are high-end luxury apartments and
          condominiums available for those who can afford them. However, the Downtown Detroit partnership and the
          Business Improvement Zone recognize that really great places offer housing for people of all incomes, as well
          as a mix of housing types for people at different stages of life and circumstances. Explore the graphs below
          to see how Downtown is doing and how it compares with other cities’ downtown areas.
        </p>
        <span className="chart-header">Income, Housing Values and Rent Across Downtown Areas </span>
        <div className="chart-container">
          <div className={"btn-switcher"}>
            <span onClick={event => this.switchCategory("MEDIAN HOUSEHOLD INCOME")} className={btn1}>MEDIAN
              HOUSEHOLD INCOME</span>
            <span onClick={event => this.switchCategory("OWNER VALUE")} className={btn2}>MEDIAN VALUE OF AN OWNED HOUSING UNIT</span>
            <span onClick={event => this.switchCategory("RENT")} className={btn3}>MEDIAN MONTHLY RENT</span>
          </div>
          <div className={"grouped"}>
            <IncomeAreaChart data={this.state.detroit} yScale={this.state.maxYScale} title={"DOWNTOWN<br/>DETROIT"}
                             color={"#00A0DF"} className={'chart'}/>
            <IncomeAreaChart data={this.state.denver} yScale={this.state.maxYScale} title={"DOWNTOWN<br/>DENVER"}
                             color={"#FF9E15"} className={'chart'}/>
            <IncomeAreaChart data={this.state.baltimore} yScale={this.state.maxYScale} title={"DOWNTOWN<br/>BALTIMORE"}
                             color={"#009382"} className={'chart'}/>
            <IncomeAreaChart data={this.state.pittsburgh} yScale={this.state.maxYScale} title={"DOWNTOWN<br/>PITTSBURGH"}
                             color={"#D5D654"} className={'chart'}/>
          </div>
          <DataBar config={this.state.config}/>
        </div>
        <div className="chart-footer">Source: U.S. Census Bureau, American Community Survey, 2017</div>


        <p className='main-text__black'>Downtown Detroit is an attractive, vibrant place to live and work - with the demand for housing increasing. Occupancy rates are near 100%, housing prices have increased substantially and more businesses moving Downtown over the past several years.</p>
        <span className="chart-header">Percent of Housing Units with Unaffordable Housing Costs, by Income, 2016. </span>
        <div className="chart-container">
          <IncomeBarChart/>
        </div>
        <div className="chart-footer">Source: U.S. Census Bureau, American Community Survey, 2017</div>


      </div>

    );
  }

}

export default IncomeAffordability;