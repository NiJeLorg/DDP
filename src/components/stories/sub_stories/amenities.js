import React, {Component} from 'react';
import Counter from  './../../charts/counter';
import { getAmenitiesData } from './../../../services/api';
const AMENITIES = [
  {
    img: '/img/restaurant.svg',
    count: 0,
    label: 'Restaurants Downtown',
    id: 'restaurants'
  },{
    img: '/img/retail.svg',
    count: 0,
    label: 'Retail Downtown',
    id: 'retailers'
  },{
    img: '/img/park.svg',
    count: 0,
    label: 'Parks Maintained',
    id: 'parks'
  }
];
class Amenities  extends Component {


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
    getAmenitiesData().then(resp => {
       const data = AMENITIES.map(amenity => {
        amenity.count = resp[amenity.id];
        return amenity;
      });
      this.setState({data});
    })
  }

  render() {
    const counters = this.state.data.map((amenity) => {
      return <Counter
        counter={amenity} key={Math.random()}/>
    });
    return (
      <div>
        <h1 className="sub-sub-heading__purple" data-story-id="2" data-story-overlay="Amenities"><span className='ul-yellow-color'>II.</span>Amenities</h1>
        <p className='main-text__black'>Downtown Detroit provides many features to make your experience more enjoyable.
          From places to use the restroom (Lighthouse “stations”), to great spots to enjoy a picnic, the following tools
          are meant to help you understand what is available during your time downtown. Also show the locations of
          restaurants and retail.
        </p>
        {counters}
      </div>
    );
  }

};

export default Amenities;