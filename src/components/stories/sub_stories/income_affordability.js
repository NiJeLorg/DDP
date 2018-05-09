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
        <h1 className="sub-sub-heading__purple"> <span className='ul-yellow-color'>IV.</span>INCOME/AFFORDABILITY/TENURE/HOUSING</h1>
        <p className='main-text__black'>Outine eu hexagon mollit cold-pressed cardigan ethical. Conequat vinyl officia excepteur microdosing air plant mollit aliquip quinoa cliche bespoke meditation messenger bag commodo kinfolk. Hell of esse before they sold out neutra. </p>
        <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
        <div className="chart-container">
          <div className={"btn-switcher"}>
            <Link to={'#'} onClick={event => this.switchCategory("MEDIAN HOUSEHOLD INCOME")} className={btn1}>MEDIAN
              HOUSEHOLD INCOME</Link>
            <Link to={'#'} onClick={event => this.switchCategory("OWNER VALUE")} className={btn2}>OWNER VALUE</Link>
            <Link to={'#'} onClick={event => this.switchCategory("RENT")} className={btn3}>RENT</Link>
          </div>
          <div className={"grouped"}>
            <IncomeAreaChart data={this.state.detroit} yScale={this.state.maxYScale} title={"DOWNTOWN DETROIT"} color={"#00A0DF"} className={'chart'}/>
            <IncomeAreaChart data={this.state.denver}   yScale={this.state.maxYScale} title={"DOWNTOWN DENVER"} color={"#FF9E15"} className={'chart'}/>
            <IncomeAreaChart data={this.state.baltimore} yScale={this.state.maxYScale} title={"DOWNTOWN BALTIMORE"} color={"#009382"} className={'chart'}/>
            <IncomeAreaChart data={this.state.pittsburgh} yScale={this.state.maxYScale} title={"DOWNTOWN PITTSBURGH"} color={"#D5D654"} className={'chart'}/>
          </div>

        </div>
        <p className='main-text__black'>Something about workers educational attainment Waistcoat normcore trust fund cloud bread asymmetrical
          neutra. Tacos kickstarter neutra fixie air plant mixtape, raw denim hoodie helvetica offal direct trade.</p>
        <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
        <div className="chart-container">
          <IncomeBarChart />
        </div>

      </div>

    );
  }

}

export default IncomeAffordability;