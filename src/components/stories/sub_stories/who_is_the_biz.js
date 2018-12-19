import React, {Component} from 'react';
import Slider from "react-slick";


class WhoIsTheBIZ extends Component {
  render() {
    const settings = {
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      swipeToSlide: true,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
    };

    return (
      <div className='story-margin'>
        <h1 className="sub-sub-heading__purple" data-story-id="2" data-story-overlay="Who is the BIZ?"><span className='ul-yellow-color'>II.</span>WHO DOES THE BIZ SERVE?</h1>
        <div className="l-story-grid">
        <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
            <div className="chart-header">Downtown Detroit BIZ Board of Directors</div>
              <img className="c-thumbnail" src="/img/board.svg" alt=""/>
              <p className='main-text__black'>The Downtown Detroit BIZ is guided by 14 diverse individuals serving as volunteer board members providing leadership to the organization.
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Property Owners</div>
                <img className="c-thumbnail" src="/img/property_owners.svg" alt=""/>
                <p className='main-text__black'>The BIZ represents 556 properties and individuals who own a building or property, ranging from commercial use to residential. 
                </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="chart-header">Businesses</div>
              <img className="c-thumbnail" src="/img/businesses.svg" alt=""/>
              <p className='main-text__black'>The BIZ works directly with Downtown business owners to provide resources, information and services to support their company. 
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Employees</div>
                <img className="c-thumbnail" src="/img/employees.svg" alt=""/>
                <p className='main-text__black'>With over 70,000 employees in Downtown, the BIZ manages the day-to-day appearance of the urban core and 
                </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="chart-header">Residents</div>
              <img className="c-thumbnail" src="/img/residents.svg" alt=""/>
              <p className='main-text__black'>The Downtown neighborhood continues to grow, with nearly 6,500 residents. The BIZ gives residents a clean, safe and vibrant Downtown.  
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Visitors</div>
                <img className="c-thumbnail" src="/img/visitors.svg" alt=""/>
                <p className='main-text__black'>Events Downtown are flourishing and are expanding. The BIZ keeps the Downtown inviting to visitors from around the globe.  
                </p>
            </div>
          </div>
        </div>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">Downtown Detroit BIZ Board of Directors</div>
              <p className='main-text__black'>The Downtown Detroit BIZ is led by a volunteer Board of Directors, which represents the community of Downtown property owners who decided to invest in a special assessment to supplement city services and advance Downtown.
              </p>
              <div className="story-slider">
                <Slider {...settings}>
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="http://www.fillmurray.com/g/200/200" alt=""/>
                      <p className='main-text__black'>Banh mi readymade pabst glossier vexillologist pug hashtag hammock brunch blog schlitz shoreditch. Migas man braid vaporware four dollar toast artisan raw denim fixie swag chicharrones. Raclette shaman tacos, pok pok woke neutra pop-up before they sold out seitan. Prism 3 wolf moon irony snackwave deep v schlitz YOLO gochujang fixie paleo. Vice tumeric direct trade tilde meh disrupt. 
                      </p>
                    </div>
                  </div>
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="http://www.fillmurray.com/g/200/200" alt=""/>
                      <p className='main-text__black'>Banh mi readymade pabst glossier vexillologist pug hashtag hammock brunch blog schlitz shoreditch. Migas man braid vaporware four dollar toast artisan raw denim fixie swag chicharrones. Raclette shaman tacos, pok pok woke neutra pop-up before they sold out seitan. Prism 3 wolf moon irony snackwave deep v schlitz YOLO gochujang fixie paleo. Vice tumeric direct trade tilde meh disrupt. 
                      </p>
                    </div>
                  </div>       
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="http://www.fillmurray.com/g/200/200" alt=""/>
                      <p className='main-text__black'>Banh mi readymade pabst glossier vexillologist pug hashtag hammock brunch blog schlitz shoreditch. Migas man braid vaporware four dollar toast artisan raw denim fixie swag chicharrones. Raclette shaman tacos, pok pok woke neutra pop-up before they sold out seitan. Prism 3 wolf moon irony snackwave deep v schlitz YOLO gochujang fixie paleo. Vice tumeric direct trade tilde meh disrupt.
                      </p>
                    </div>
                  </div>
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="http://www.fillmurray.com/g/200/200" alt=""/>
                      <p className='main-text__black'>Banh mi readymade pabst glossier vexillologist pug hashtag hammock brunch blog schlitz shoreditch. Migas man braid vaporware four dollar toast artisan raw denim fixie swag chicharrones. Raclette shaman tacos, pok pok woke neutra pop-up before they sold out seitan. Prism 3 wolf moon irony snackwave deep v schlitz YOLO gochujang fixie paleo. Vice tumeric direct trade tilde meh disrupt. 
                      </p>
                    </div>
                  </div>
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="http://www.fillmurray.com/g/200/200" alt=""/>
                      <p className='main-text__black'>Banh mi readymade pabst glossier vexillologist pug hashtag hammock brunch blog schlitz shoreditch. Migas man braid vaporware four dollar toast artisan raw denim fixie swag chicharrones. Raclette shaman tacos, pok pok woke neutra pop-up before they sold out seitan. Prism 3 wolf moon irony snackwave deep v schlitz YOLO gochujang fixie paleo. Vice tumeric direct trade tilde meh disrupt.
                      </p>
                    </div>
                  </div>                                  
                </Slider>
              </div>
            </div>
          </div>
        </div>




      </div>
    );
  };
};

export default WhoIsTheBIZ;