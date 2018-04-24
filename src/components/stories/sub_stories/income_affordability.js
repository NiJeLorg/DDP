import React, {Component} from 'react';
import DataBar from './../../charts/data_bar';
import classNames from 'classnames';
import gsjson from 'google-spreadsheet-to-json';
import _ from 'lodash';
import IncomeAreaChart from './../../charts/income_area_chart';
import {Link} from 'react-router-dom';
const categories = {
  "MEDIAN HOUSEHOLD INCOME": 0,
  "OWNER VALUE": 1,
  "RENT": 2
};

class IncomeAffordability extends Component {


  constructor(props) {
    super(props);
    this.state = {
      detroit: [],
      denver: [],
      baltimore: [],
      pittsburgh: [],
      data: [],
      activeCategory: 'MEDIAN HOUSEHOLD INCOME'
    };
  }

  componentDidMount() {
    gsjson({
      spreadsheetId: '1tCjhTClMG93iMB43Zf4vm7JnuDqSnCPy5GkylEeBf0w',
      worksheet: ['Average Household Income', 'Owner Value', 'Rent']
      // other options...
    })
      .then((result) => {
        console.log(result);
        this.setState({data: result});
        this.updateAreaCharts(this.state.data[categories[this.state.activeCategory]]);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.stack);
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
        <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
        <div className="chart-container">
          <div className={"btn-switcher"}>
            <Link to={'#'} onClick={event => this.switchCategory("MEDIAN HOUSEHOLD INCOME")} className={btn1}>MEDIAN
              HOUSEHOLD INCOME</Link>
            <Link to={'#'} onClick={event => this.switchCategory("OWNER VALUE")} className={btn2}>OWNER VALUE</Link>
            <Link to={'#'} onClick={event => this.switchCategory("RENT")} className={btn3}>RENT</Link>
          </div>
          <div className={"grouped"}>
            <IncomeAreaChart data={this.state.detroit} title={"DETROIT"} className={'chart'}/>
            <IncomeAreaChart data={this.state.denver} title={"DENVER"} className={'chart'}/>
            <IncomeAreaChart data={this.state.baltimore} title={"BALTIMORE"} className={'chart'}/>
            <IncomeAreaChart data={this.state.pittsburgh} title={"PITTSBURGH"} className={'chart'}/>
          </div>

        </div>

      </div>

    );
  }

}

export default IncomeAffordability;