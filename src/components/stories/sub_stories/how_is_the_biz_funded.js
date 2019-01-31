import React, {Component} from 'react';
import SEVLineChart from  '../../charts/sev_line_chart';
import FloorAreaLineChart from  '../../charts/floor_area_line_chart';
// import BIZRevenueChart from '../../charts/biz_revenue_chart';
import BIZRevenueBarChart from '../../charts/biz_revenue_bar_chart';
import BIZAssessmentBarChart from '../../charts/biz_assessment_bar_chart';
import BIZChangeInAssessmentBarChart from '../../charts/biz_change_in_assessment_bar_chart';
import { getBIZRevenueData } from './../../../services/api';
import { getAssessedValueData } from './../../../services/api';
import { getChangeInAssessment } from './../../../services/api';
import DistributionOfRevenueChart from '../../charts/distribution_of_revenue_chart';
import GeoMap from "../../geomap";
import CHAPTERS from '../../../utils/content';


class HowIsTheBIZFunded extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data_BIZRevenue: [],
      data_AssessedValue: [],
      data_ChangeAssessment: [],
      chapter: CHAPTERS[3],
    }

  }

  componentDidMount(){
    getBIZRevenueData().then(resp => {
      this.setState({data_BIZRevenue: resp})
    });
    getAssessedValueData().then(resp => {
      this.setState({data_AssessedValue: resp})
    });
    getChangeInAssessment().then(resp => {
      this.setState({data_ChangeAssessment: resp})
    });
  }

  render() {
    
    return (
      <div className='story-margin' id="howisthebizfunded">
        <h1 className="sub-sub-heading__purple" data-story-id="3" data-story-overlay="How is the BIZ Funded?"><span className='ul-yellow-color'>3.</span>HOW IS THE BIZ FUNDED?</h1>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <p className='main-text__black'>The Downtown Detroit Business Improvement Zone is funded completely through a modest special assessment paid by owners of assessable property within the BIZ boundaries. Defined in <a href="http://downtowndetroit.org/wp-content/uploads/2015/06/BIZ_Zone-Plan-legal-format.pdf">The BIZ Plan</a>, assessable properties are exclusively taxable properties. Tax-exempt, non-commercial properties are not assessable. 
              </p>              
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Assessable Properties</div>
                <p className='main-text__black'>The following types of properties are assessable under the BIZ Plan:
                </p>
              </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">           
              <div className="chart-header">Commercial Properties</div>
              <img className="c-thumbnail" src="/img/businesses.svg" alt=""/>
              <p className='main-text__black'>Properties with businesses conducting for-profit business, such as retail stores, markets, offices, parking, and restaurants and providing other services. 
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Renter Occupied Residential Properties</div>
              <img className="c-thumbnail" src="/img/property_owners.svg" alt=""/>
              <p className='main-text__black'>Residential properties where the owner of the property charges residents rent. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Non Assessable Properties</div>
              <p className='main-text__black'>The following types of properties are not assessable under the BIZ Plan:
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="chart-header">Government</div>
              <img className="c-thumbnail" src="/img/government.svg" alt=""/>
              <p className='main-text__black'>Property owned by public, governmental entities such as city, county, state and federal offices, parks, plazas and roads.
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Stadium Authorities</div>
              <img className="c-thumbnail" src="/img/stadium.svg" alt=""/>
              <p className='main-text__black'>The Stadium Authority owns the land for both Comerica Park and Ford Field. Neither are assessable. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="chart-header">Religious and Charitable Organizations</div>
              <img className="c-thumbnail" src="/img/religion.svg" alt=""/>
              <p className='main-text__black'>Churches, Mosque, Synagogues and other properties owned by religious, or other non-profit and charitable organizations, and used for non-commercial purposes. 
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Educational Institutions</div>
              <img className="c-thumbnail" src="/img/school.svg" alt=""/>
              <p className='main-text__black'>Public or private organizations providing education, such as primary and secondary schools and universities. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="chart-header">Owner Occupied Residential Properties</div>
              <img className="c-thumbnail" src="/img/owner_occupied.svg" alt=""/>
              <p className='main-text__black'>Properties used for residential purposes and owned and occupied by the taxpayer. Downtown this is primarily condominiums.  
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">How Are BIZ Properties Assessed?</div>
              <p className='main-text__black'>Business Improvement Zone special assessments are calculated by applying a percentage of assessed value plus a percentage of building floor area for each commercial property. These percentages were established with the adoption of <a href="http://downtowndetroit.org/wp-content/uploads/2015/06/BIZ_Zone-Plan-legal-format.pdf">The BIZ Plan</a> in 2014. In addition, there is a per parcel cap of $150,000 and increases in assessments are limited to 3% per parcel per year. The City of Detroit treasurer collects the special assessment with summer taxes.
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <img className="c-full-image" src="/img/assessment.svg" alt="" />
            </div>
          </div>      
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half-max-width">
              <BIZRevenueBarChart data={this.state.data_BIZRevenue} />
            </div>
            <div className="l-story-grid-column-half-max-width">
              <BIZAssessmentBarChart data={this.state.data_AssessedValue} />
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half-centered">
              <BIZChangeInAssessmentBarChart data={this.state.data_ChangeAssessment} />
            </div>
          </div>

          

          
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">How Are BIZ Properties Contributing to Revenue?</div>
              <p className='main-text__black'>Properties are assessed differently depending on their assessed value and floor area. Of the 556 properties that contribute to the BIZ, about half (46%) pay $1,000 or less. The graph below shows how many properties fall within various ranges of assessment. 
              </p>
              <div className="distribution-chart-wrapper">
                <DistributionOfRevenueChart />
                <GeoMap chapter={this.state.chapter} />
              </div>
            </div>
          </div>

          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Why is There a Delay in BIZ Assessment for New or Renovated Buildings?</div>
              <p className='main-text__black'>Downtown Detroit BIZ Assessments are based on prior year City of Detroit assessment data, as outlined in <a href="http://downtowndetroit.org/wp-content/uploads/2015/06/BIZ_Zone-Plan-legal-format.pdf">The BIZ Plan</a>. Special Assessments which are levied with the current summer tax bill are based on property assessment values set in March of the previous year. This causes a delay in when the BIZ will collect the full value of new construction. Depending on construction schedules, this delay can be between one and two years after construction completion. 
              </p>
              <img className="c-full-image" src="/img/valueofbiz_timeline.svg" alt=""/>
            </div>
          </div>
        </div>




      </div>
    );
  };
};

export default HowIsTheBIZFunded;