import React, {Component} from 'react';
import BIZBudgetChart from '../../charts/biz_budget_chart';
import BIZExpendChart from '../../charts/biz_expend_chart';

class WhereDoesBIZInvestmentGo extends Component {
  render() {

    return (
      <div className='story-margin'>
        <h1 className="sub-sub-heading__purple" data-story-id="4" data-story-overlay="Where does BIZ investment go?"><span className='ul-yellow-color'>IV.</span>WHERE DOES BIZ INVESTMENT GO?</h1>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <p className='main-text__black'>*DDP to provide* introductory text on the BIZ program budget and the level of administrative costs. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              
              <div id="BIZBudgetChartDiv" className="chart-container">
                <BIZBudgetChart />
              </div>
              <div id="BIZExpendChartDiv" className="chart-container">
                <BIZExpendChart />
              </div>              
              <div id="chart-tooltip" className="c-chart-tooltip hidden">
                <p><strong><span id="tooltip-category"></span></strong></p>
                <p><span id="tooltip-budget"></span></p>
              </div>
              <div id="chart-modal" className="c-chart-modal hidden">
                <h1><span id="modal-category"></span><span id="close" className="c-close"><i className="fas fa-times"></i></span></h1>
                <p><span id="modal-type"></span> <strong><span id="modal-budget"></span></strong></p>
                <p><span id="modal-description"></span></p>
                <p><strong>Activities include:</strong></p>
                <ul id="modal-categories">
                </ul>
              </div>          
            </div>
          </div>
        </div>

        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">

            </div>
          </div>
        </div>
      </div>
 
    );
  };
};

export default WhereDoesBIZInvestmentGo;