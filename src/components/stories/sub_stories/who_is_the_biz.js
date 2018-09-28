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
        <h1 className="sub-sub-heading__purple" data-story-id="2" data-story-overlay="Who is the BIZ?"><span className='ul-yellow-color'>II.</span>WHO IS THE BIZ?</h1>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
            <div className="chart-header">Property Owners</div>
              <img className="c-thumbnail" src="http://www.fillmurray.com/200/200" alt=""/>
              <p className='main-text__black'>*DDP to provide* copy for each category of "Who". Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar. 
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Residents</div>
              <img className="c-thumbnail" src="http://www.fillmurray.com/g/200/200" alt=""/>
              <p className='main-text__black'>*DDP to provide* copy for each category of "Who". Intelligentsia edison bulb poke etsy dreamcatcher. Squid humblebrag shabby chic farm-to-table ugh hashtag. You probably haven't heard of them succulents occupy la croix lo-fi freegan. Air plant hoodie fashion axe, tacos shaman gastropub polaroid edison bulb vexillologist offal kinfolk jianbing. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
            <div className="chart-header">Businesses</div>
              <img className="c-thumbnail" src="https://picsum.photos/200" alt=""/>
              <p className='main-text__black'>*DDP to provide* copy for each category of "Who". Chartreuse affogato humblebrag, VHS tumblr salvia umami tilde food truck meggings austin tofu. Post-ironic swag snackwave seitan chambray. Semiotics ennui live-edge, fanny pack meh locavore hell of deep v trust fund. Portland taxidermy celiac prism kombucha chillwave literally. 
              </p>
            </div>
            <div className="l-story-grid-column-half">
              <div className="chart-header">Visitors</div>
              <img className="c-thumbnail" src="https://www.placecage.com/g/200/200" alt=""/>
              <p className='main-text__black'>*DDP to provide* copy for each category of "Who". Tumblr lyft tilde VHS yr. Pinterest chia iceland cloud bread, man bun twee microdosing DIY master cleanse semiotics kombucha before they sold out. Venmo photo booth authentic irony fanny pack readymade viral yr listicle food truck butcher church-key. 
              </p>
            </div>
          </div>
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
            <div className="chart-header">Downtown Workers</div>
              <img className="c-thumbnail" src="https://www.placebear.com/200/200" alt=""/>
              <p className='main-text__black'>*DDP to provide* copy for each category of "Who". Chartreuse affogato humblebrag, VHS tumblr salvia umami tilde food truck meggings austin tofu. Post-ironic swag snackwave seitan chambray. Before they sold out farm-to-table four dollar toast man bun. Narwhal pork belly meggings semiotics brooklyn adaptogen art party keffiyeh sriracha. 
              </p>
            </div>
          </div>

        </div>
        <div className="l-story-grid">
          <div className="l-story-grid-row">
            <div className="l-story-grid-column-half">
              <div className="sub-sub-heading">BIZ Board Members</div>
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