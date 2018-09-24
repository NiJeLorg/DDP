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
        <h1 className="sub-sub-heading__purple" data-story-id="2" data-story-overlay="Who is the BIZ?"><span className='ul-yellow-color'>V.</span>WHAT'S THE IMPACT OF BIZ SERVICES ON THE COMMUNITY?</h1>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <p className='main-text__black'>*DDP to provide* introductory text on the impact of BIZ services on the community. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>      
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Downtown Ambassadors</div>
              <p className='main-text__black'>*DDP to provide* brief description of the impacts the ambassadors have had. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
              {counters}
            </div>
          </div>

          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Parks and Common Areas</div>
              <p className='main-text__black'>*DDP to provide* brief description of the impacts related to the parks and common areas. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
              <img className="c-full-image" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Daffodils_in_Downtown_Detroit.jpg" alt=""/>

            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Safety</div>
              <p className='main-text__black'>*DDP to provide* brief description of the impacts related to safety initiatives. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
              <img className="c-full-image" src="https://farm3.staticflickr.com/2922/13992844271_19c81d980a_k.jpg" alt=""/>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Supplemental lighting</div>
              <p className='main-text__black'>*DDP to provide* brief description of the impacts related to supplemental lighting. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
              <img className="c-full-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/West_Grand_Blvd._Holiday_Lighting_%285355530446%29.jpg/1024px-West_Grand_Blvd._Holiday_Lighting_%285355530446%29.jpg" alt=""/>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Communications, Marketing, Outreach and Data</div>
              <p className='main-text__black'>*DDP to provide* brief description of the impacts of their work in communications, marketing, outreach and data. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
              <img className="c-full-image" src="https://farm3.staticflickr.com/2909/13992812641_900e4bd1a7_k.jpg" alt=""/>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Infrastructure and Planning</div>
              <p className='main-text__black'>*DDP to provide* brief description of the impacts from infrastructure and planning work. Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
              <img className="c-full-image" src="https://farm5.staticflickr.com/4281/35348166215_de56d1bad3_k.jpg" alt=""/>
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