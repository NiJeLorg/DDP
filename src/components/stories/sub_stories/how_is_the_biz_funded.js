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
      <div className='story-margin'>
        <h1 className="sub-sub-heading__purple" data-story-id="3" data-story-overlay="How is the BIZ Funded?"><span className='ul-yellow-color'>III.</span>HOW IS THE BIZ FUNDED?</h1>
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
              <img className="c-thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Broadway_Avenue_Historic_District_-_Detroit%2C_Michigan.jpg" alt=""/>
              <p className='main-text__black'>Properties with businesses conducting for-profit business, such as retail stores, markets, offices, parking, and restaurants and providing other services. 
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Renter Occupied Residential Properties</div>
              <img className="c-thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/0/09/Row_of_buildings_in_downtown_Detroit.jpg" alt=""/>
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
              <img className="c-thumbnail" src="https://farm1.staticflickr.com/778/21560434809_8308cd2ad9_k.jpg" alt=""/>
              <p className='main-text__black'>Property owned by public, governmental entities such as city, county, state and federal offices, parks, plazas and roads.
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Stadium Authorities</div>
              <img className="c-thumbnail" src="https://crain-platform-cdb-prod.s3.amazonaws.com/s3fs-public/styles/width_792/public/TigersGame-ComericaPark-main_i.jpg" alt=""/>
              <p className='main-text__black'>The Stadium Authority owns the land for both Comerica Park and Ford Field. Neither are assessable. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="chart-header">Religious and Charitable Organizations</div>
              <img className="c-thumbnail" src="https://upload.wikimedia.org/wikipedia/commons/4/48/GreektownCasinohotelandStMaryRCChurchDetroit.jpg" alt=""/>
              <p className='main-text__black'>Churches, Mosque, Synagogues and other properties owned by religious, or other non-profit and charitable organizations, and used for non-commercial purposes. 
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Educational Institutions</div>
              <img className="c-thumbnail" src="http://www.law-school-tutor.com/wp-content/uploads/2016/05/University_of_Detroit_Mercy_Law_Tutoring-e1463554014255.jpg" alt=""/>
              <p className='main-text__black'>Public or private organizations providing education, such as primary and secondary schools and universities. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="chart-header">Owner Occupied Residential Properties</div>
              <img className="c-thumbnail" src="https://farm5.staticflickr.com/4041/4634813321_ba305a23b5_b.jpg" alt=""/>
              <p className='main-text__black'>Properties used for residential purposes and owned and occupied by the taxpayer. Downtown this is primarily condominiums.  
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">How Are BIZ Properties Assessed?</div>
              <p className='main-text__black'>Business Improvement Zone special assessments are calculated by applying a percentage of assessed value plus a percentage of building floor area for each commercial property. These percentages were established with the adoption of <a href="http://downtowndetroit.org/wp-content/uploads/2015/06/BIZ_Zone-Plan-legal-format.pdf">The BIZ Plan</a> by in 2014. In addition, there is a per parcel cap of $150,000 and increases in assessments are limited to 3% per parcel per year. The City of Detroit treasurer collects the special assessment with summer taxes.
              </p>
              <img className="c-full-image" src="/img/assessment.svg" alt="" style="width:800px"/>

            </div>
          </div>
          // <div className="l-story-grid-row">
          //   <div className="l-story-grid-column-half">
          //     <div className="chart-container">
                // <table className="c-table">

                  // <tbody>
                  // <tr>
                  //   <td className="c-table__1_3_column">$0.003 <i className="fas fa-times"></i> Assessed Value</td>
                  //   <td className="c-table__2_column"><i className="fas fa-plus fa-2x"></i></td>
                  //   <td className="c-table__1_3_column">$0.058 <i className="fas fa-times"></i> Floor Area Square Footage</td>
                  // </tr>
                  // <tr>
                  //   <td className="c-table__1_3_column">
                  //     <img className="c-full-image" src="/img/clipbooard_person.png" />
                  //   </td>
                  //   <td className="c-table__2_column"><i className="fas fa-plus fa-2x"></i></td>
                  //   <td className="c-table__1_3_column">
                  //     <img className="c-full-image c-floor-area-image" src="/img/floor-area.jpg" />
                  //   </td>
                  // </tr>
                  // <tr>
                  //   <td className="c-table__1_3_column">
                  //     <SEVLineChart />
                  //   </td>
                  //   <td className="c-table__2_column"><i className="fas fa-plus fa-2x"></i></td>
                  //   <td className="c-table__1_3_column">
                  //     <FloorAreaLineChart />
                  //   </td>
                  // </tr>
                  // <tr>
                  //   <td className="c-table__1_3_column">For every $407 of assessed value, the BIZ receives $1 in revenue</td>
                  //   <td className="c-table__2_column"></td>
                  //   <td className="c-table__1_3_column">For every 17 square feet of floor area, the BIZ receives $1 in revenue</td>
                  // </tr>
                  // <tr>
                  //   <td className="c-table__1_3_column"></td>
                  //   <td className="c-table__2_column"><i className="fas fa-equals fa-2x"></i></td>
                  //   <td className="c-table__1_3_column"></td>
                  // </tr>
                  // </tbody>
                // </table>
                // <div className="sub-heading__centered">$4,165,972 in total BIZ assessement in 2018</div>
              </div>
            </div>
            <div className="l-story-grid-column-half">
              <BIZRevenueBarChart data={this.state.data_BIZRevenue} />
              <BIZAssessmentBarChart data={this.state.data_AssessedValue} />
              <BIZChangeInAssessmentBarChart data={this.state.data_ChangeAssessment} />
            </div>

          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">How Are BIZ Properties Contributing to Revenue?</div>
              <p className='main-text__black'>Properties are assessed differently depending on their assessed value and floor area. Of the 566 properties that contribute to the BIZ, about half (46%) pay $1,000 or less. The graph below shows how many properties fall within various ranges of assessment. 
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

export default HowIsTheBIZFunded;