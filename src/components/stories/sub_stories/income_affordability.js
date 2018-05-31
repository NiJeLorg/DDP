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
      maxYScale: DEFAULT_MAX_SCALE
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
    _.forEach(categoryData, (dataset) => {
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
    });
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
      <div>
        <h1 className="sub-sub-heading__purple" data-story-id="4" data-story-overlay="Affordability"><span className='ul-yellow-color'>IV.</span>Downtown Affordability
        </h1>
        <p className='main-text__black'>Downtown Detroit is a desirable place to live and work, and the market price for
          housing is increasing because of it. As in most downtowns, there are high-end luxury apartments and
          condominiums available for those who can afford them. However, the Downtown Detroit partnership and the
          Business Improvement Zone recognize that really great places offer housing for people of all incomes, as well
          as a mix of housing types for people at different stages of life and circumstances. Explore the graphs below
          to see how Downtown is doing and how it compares with other cities’ downtown areas.
        </p>
        <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
        <div className="chart-container">
          <div className={"btn-switcher"}>
            <Link to={'#'} onClick={event => this.switchCategory("MEDIAN HOUSEHOLD INCOME")} className={btn1}>MEDIAN
              HOUSEHOLD INCOME</Link>
            <Link to={'#'} onClick={event => this.switchCategory("OWNER VALUE")} className={btn2}>OWNER VALUE</Link>
            <Link to={'#'} onClick={event => this.switchCategory("RENT")} className={btn3}>AVERAGE MONTHLY RENT</Link>
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
          <DataBar/>
        </div>


        <p className='main-text__black'>Downtown Detroit is a safe, attractive, vibrant place to live, and the demand
          for housing is high. Occupancy rates for available residential units is near 100%, and the price of housing
          has increased substantially over the past several years. Despite this trend, it is important that there
          remains a variety of price-points and affordable options, so that people with fewer economic resources can
          afford living Downtown without sacrificing too large a percentage of their income. A standard metric for
          housing affordability is 30% of income or less. More than that is considered unaffordable for an individual.
          The following graphs explore income, housing affordability and rental prices for Downtown and how it looks in
          comparison to our benchmark cities.</p>
        <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
        <div className="chart-container">
          <IncomeBarChart/>
          <DataBar/>
        </div>


      </div>

    );
  }

}

export default IncomeAffordability;