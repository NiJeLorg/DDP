import React, {Component} from 'react';
import Counter from  './../../charts/counter';
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
  {
    img: '/img/panhandler_contacts.svg',
    count: 0,
    matcher: 'Panhandling',
    label: 'Panhandler Contacts',
    id: 'panhandler'
  },
  {
    img: '/img/business_contacts.svg',
    count: 0,
    matcher: 'Business Contacts',
    label: 'Businesses Contacts',
    id: 'businesses'
  }
];
class Welcoming  extends Component {


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
      return <Counter
        counter={work} key={Math.random()}/>
    });
    return (
      <div>
        <h1 className="sub-sub-heading__purple" data-story-id="1" data-story-overlay="Clean and Welcoming"><span className='ul-yellow-color'>I.</span>CLEAN AND WELCOMING</h1>
        <p className='main-text__black'>The Downtown Detroit Partnership with its contract with the Business Improvement Zone provides many services that improve the experience of outdoor public space in the Downtown area.  With just a modest budget, the DDP and the BIZ provide daily entertainment, landscape medians, maintain parks, pick up litter, clean up streets and sidewalks, remove stickers and graffiti from the right of way, provide information for visitors, provide supplemental lighting and security services and help people get around.

        </p>
        {counters}
      </div>
    );
  }

};

export default Welcoming;