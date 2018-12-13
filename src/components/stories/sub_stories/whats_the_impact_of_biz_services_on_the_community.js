import React, {Component} from 'react';
import CounterImpact from  './../../charts/counter_impact';
import _ from 'lodash';
import { getCleaningWelcomingWorkData } from './../../../services/api';

const WORKS = [
  {
    img: '/img/trash.svg',
    count: 0,
    matcher: 'Trash (lbs)',
    label: 'Pounds of Trash Removed',
    id: 'trash'
  },{
    img: '/img/motorist.svg',
    count: 0,
    label: 'Motorists Assisted',
    matcher: 'Motorist Assist',
    id: 'motorist'
  },{
    img: '/img/pedestrians.svg',
    count: 0,
    label: 'Pedestrians Assisted',
    matcher: 'Pedestrian Assistance',
    id: 'pedestrians',
  },{
    img: '/img/graffiti.svg',
    count: 0,
    matcher: 'Graffiti - Removed',
    label: 'Feet of Graffiti Removed',
    id: 'graffiti'
  },
  // {
  //   img: '/img/panhandler_contacts.svg',
  //   count: 0,
  //   matcher: 'Panhandling',
  //   label: 'Panhandler Contacts',
  //   id: 'panhandler'
  // },
  {
    img: '/img/business_contacts.svg',
    count: 0,
    matcher: 'Business Contacts',
    label: 'Businesses Contacts',
    id: 'businesses'
  }
];

class WhatsTheImpactOfBIZServicesOnTheCommunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }

  }

  componentDidMount(){
    this.getData();
  }

  getData() {
    getCleaningWelcomingWorkData().then(resp => {
      let tasks = {};
      _.forEach(resp[0], function(task){
          tasks[task.task.toLowerCase()] = task.count;
      });
      const data = WORKS.map( work => {
         work.count = tasks[work.matcher.toLowerCase()];
        return work;
      });
      this.setState({data});
    })

  }


  render() {

    const counters = this.state.data.map((work) => {
      return <CounterImpact
        counter={work} key={Math.random()}/>
    });

    return (
      <div className='story-margin'>
        <h1 className="sub-sub-heading__purple" data-story-id="5" data-story-overlay="What is the impact of BIZ services on the community?"><span className='ul-yellow-color'>V.</span>WHAT'S THE IMPACT OF BIZ SERVICES ON THE COMMUNITY?</h1>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <p className='main-text__black'>The BIZ delivers services of hospitality, cleaning, supplemental lighting, safety efforts, parks maintenance, data support and outreach to benefit Downtown. Through a special assessment, the financial contributions of Downtown property owners enable the BIZ to serve the Downtown community in these important ways.  
              </p>
              <ul>
                <li>Community and Business Engagement</li>
                <li>Data</li>
                <li>Downtown Ambassadors</li>
                <li>Downtown Supplemental Lighting</li>
                <li>Infrastructure and Planning</li>
                <li>Park and Street Landscaping</li>
                <li>Safety</li>
              </ul>      
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Community and Business Engagement</div>
              <p className='main-text__black'>As part of the continued effort to provide information and engage Downtown businesses regularly, the BIZ provides access to resources, events and information through the Downtown BIZ Connect network.  
              </p>

            </div>
          </div>

          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Data</div>
              <p className='main-text__black'>Following up with Josh/Gina 
              </p>
              <img className="c-full-image" src="https://farm3.staticflickr.com/2909/13992812641_900e4bd1a7_k.jpg" alt=""/>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Downtown Ambassadors</div>
              <p className='main-text__black'>The Downtown Detroit Ambassador, established in 2006, has transformed the appearance of Downtown Detroit. The Ambassadors are the proactive and friendly individuals who clean public areas and serve as information resources for Downtown’s businesses, residents, and visitors.
              </p>
              <p>Use stats from annual report below:</p>
              {counters}
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Infrastructure and Planning</div>
              <p className='main-text__black'>Following up with Josh/Gina 
              </p>
              <img className="c-full-image" src="https://farm5.staticflickr.com/4281/35348166215_de56d1bad3_k.jpg" alt=""/>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Park and Street Landscaping</div>
              <p className='main-text__black'>The BIZ supports a healthy and green Downtown through beautiful trees, plants and flowers help create a welcoming environment. The BIZ contributes to four downtown parks maintained by the DDP, medians in key corridors, sidewalk planters and highway entrances. 
              </p>
              <img className="c-full-image" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Daffodils_in_Downtown_Detroit.jpg" alt=""/>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Safety</div>
              <p className='main-text__black'>Offering security services for the core Downtown, the BIZ works collaboratively with community partners to provide resources and implementation to ensure a safe and secure environment. The BIZ safety efforts also serves as an extension of Project Lighthouse, the Downtown Central Business District neighborhood watch.  
              </p>
              <img className="c-full-image" src="https://farm3.staticflickr.com/2922/13992844271_19c81d980a_k.jpg" alt=""/>
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

export default WhatsTheImpactOfBIZServicesOnTheCommunity;