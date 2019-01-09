import React, {Component} from 'react';
import BIZBudgetChart from '../../charts/biz_budget_chart';
import BIZExpendChart from '../../charts/biz_expend_chart';



class WhereDoesBIZInvestmentGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radios: {
        tab1: '2018-2019 Budget',
        tab2: '2017-2018 Expenditures',
      },
      selectedOption: 'tab1',
      tab1Active: true,
      tab2Active: false,
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(e) {
    if (e.target.value === 'tab1') {
      this.setState({ 
        tab1Active: true,
        tab2Active: false
      });
    } else {
      this.setState({ 
        tab1Active: false,
        tab2Active: true
      });     
    }
    this.setState({
      selectedOption: e.target.value
    });
  }

  renderRadioWithLabel(key) { 
    return (
      <label key={key} htmlFor={key} className={`${this.state.selectedOption === {key}.key ? "active" : ""}`}>
        <input id={key} type="radio" name="tabs" checked={this.state.selectedOption === {key}.key} onChange={this.handleOptionChange} value={key} />
        {this.state.radios[key]}
      </label>
    );
  }
  
  render() {

    return (
      <div className='story-margin' id="wheredoesbizinvestmentgo">
        <h1 className="sub-sub-heading__purple" data-story-id="4" data-story-overlay="Where does BIZ investment go?"><span className='ul-yellow-color'>IV.</span>WHERE DOES BIZ INVESTMENT GO?</h1>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <p className='main-text__black'>As a matter of policy, the Downtown Detroit BIZ allocates less than 20% of revenue on administration. More than 80% of the funds collected from property owners goes directly to providing services to our stakeholders. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="c-tabinator">
                {Object.keys(this.state.radios).map(key => this.renderRadioWithLabel(key))}
                <div id="content1" className={`${this.state.tab1Active ? "active" : ""}`}>
                  <div id="BIZBudgetChartDiv">
                    <BIZBudgetChart />
                  </div>
                </div>
                <div id="content2" className={`${this.state.tab2Active ? "active" : ""}`}>
                  <div id="BIZExpendChartDiv">
                    <BIZExpendChart />
                  </div> 
                </div>
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