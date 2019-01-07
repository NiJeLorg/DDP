import React, {Component} from 'react';
import Slider from "react-slick";


class WhoIsTheBIZ extends Component {
  render() {
    const settings = {
      dots: true,
      speed: 500,
      infinite: true,
      centerPadding: "6px",
      slidesToShow: 2,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
      ],
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
    };

    return (
      <div className='story-margin' id="whodoesthebizserve">
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
                      <img className="c-card-thumbnail" src="/img/Tricia_Keith.jpg" alt=""/>
                      <div className="header-text__title">
                        Chair<br /> 
                        Tricia A. Keith
                      </div>
                      <div className="header-text__subtitle">
                        Executive Vice President, Chief of Staff and Corporate Secretary, Blue Cross Blue Shield of Michigan
                      </div>
                      <p className='main-text__black'>Tricia A. Keith is executive vice president, chief of staff and corporate secretary for Blue Cross Blue Shield of Michigan (BCBSM). Keith is responsible for the administration and management of all things related to the BCBSM Board of Directors and selection councils. Keith's current priority is supporting BCBSM's Board of Directors through its transition of becoming a nonprofit mutual insurer and further demonstrating BCBSM's commitment.
                      </p>
                    </div>
                  </div>
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/GeorgeBarnes.jpg" alt=""/>
                      <div className="header-text__title">
                        Vice Chair<br /> 
                        George P. Barnes, Jr.
                      </div>
                      <div className="header-text__subtitle">
                        Founder, Heritage Optical
                      </div>
                      <p className='main-text__black'>Active in the Detroit community since 1975, George P. Barnes, Jr. is the founder of Heritage Optical Center, Inc. and Heritage Vision Plans, Inc. (HVP). Heritage Optical Center, Inc. is Michigan's first African-American-owned and operated full service optical dispensary and today comprises three Detroit retail locations. HVP is a full-service vision benefit plan management company which manages and administers vision programs for a range of national public and private clients utilizing the HVP national provider network.
                      </p>
                    </div>
                  </div>
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/MikeMcLauchlan.jpg" alt=""/>
                      <div className="header-text__title">
                        Secretary<br /> 
                        Mike McLauchlan
                      </div>
                      <div className="header-text__subtitle">
                        Vice President of Government Relations, Ilitch Holdings, Inc.
                      </div>
                      <p className='main-text__black'>Mike McLauchlan is the Vice President of Government Relations and joined Ilitch Holdings, Inc. in 2008. McLauchlan has spent more than 26 years building strong relationships at all levels of the community. Previously, he was senior vice president and manager of government relations for Comerica Incorporated. There he was responsible for the strategic planning and implementation of Comerica's local, state and federal government relations activities.
                      </p>
                    </div>
                  </div> 
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Richard_Hosey.jpeg" alt=""/>
                      <div className="header-text__title">
                        Treasurer<br /> 
                        Richard J. Hosey III
                      </div>
                      <div className="header-text__subtitle">
                        Hosey Development LLC
                      </div>
                      <p className='main-text__black'>Richard J. Hosey III's real estate experience entails development, consulting, financing and asset management of more than 80 projects totaling over $2.75 billion in development costs. Hosey Development is currently developing a 25-unit market rate multifamily loft development in Midtown Detroit in the former Tushiyah United Hebrew School and co-developing 1212 Griswold, 1145 Griswold and 1249 Griswold into 240 units of market rate loft apartments and 80,000 square feet of office and commercial space in Downtown Detroit.
                      </p>
                    </div>
                  </div>  
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Charles_Beckham.jpg" alt=""/>
                      <div className="header-text__title">
                        Charles Beckham
                      </div>
                      <div className="header-text__subtitle">
                        Group Executive for Neighborhoods, City of Detroit (Retired)
                      </div>
                      <p className='main-text__black'>Charles Beckham served as the Group Executive for Neighborhoods, where he oversaw the Detroit’s Buildings, Safety Engineering and Environmental Department and the Department of Neighborhoods. Having served at an executive level over five administrations over the last 40+ years, Beckham has also runs his own management consulting firm, held numerous engineering management positions at General Motors Company and co-founded and served as Executive Director of the African American Association of Businesses &amp; Contractors.
                      </p>
                    </div>
                  </div>
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/David_Di-Rita.jpg" alt=""/>
                      <div className="header-text__title">
                        David Di Rita
                      </div>
                      <div className="header-text__subtitle">
                        Principal, Roxbury Group
                      </div>
                      <p className='main-text__black'>David Di Rita serves as the principal at the Roxbury Group. Di Rita is actively involved in real estate development projects as well as its advisory work with corporate, governmental and nonprofit clients. The Roxbury Group has advanced numerous development projects in greater Downtown Detroit, including the Auburn, the David Whitney Building, the Michigan Department of Natural Resources Outdoor Activity Center, and the Griswold.
                      </p>
                    </div>
                  </div>  
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Chris_Ferchill.jpg" alt=""/>
                      <div className="header-text__title">
                        J. Christopher Ferchill
                      </div>
                      <div className="header-text__subtitle">
                        Vice President of Development, Ferchill Group
                      </div>
                      <p className='main-text__black'>As the President of Development for The Ferchill Group, J. Christopher Ferchill partnered with his father to complete the $180 million rehabilitation of the Westin Book Cadillac Detroit Hotel and Residences in 2008. As an owner of the hotel, Ferchill maintains direct involvement in hotel operations. In addition, Ferchill opens and operates Michael Symon's Roast in the Westin Book Cadillac Hotel, noted as one of the country's best steak restaurants.
                      </p>
                    </div>
                  </div> 
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Linda_Forte.jpg" alt=""/>
                      <div className="header-text__title">
                        Linda D. Forte
                      </div>
                      <div className="header-text__subtitle">
                        Senior Vice President of Business Affairs, and Chief Diversity Officer, Comerica Bank (Retired)
                      </div>
                      <p className='main-text__black'>Linda D. Forte served as the senior vice president of Business Affairs and chief diversity officer for Comerica Bank. She was responsible for defining and driving business strategies that establish Comerica as a leader in diversity and work life practices and has achieved national recognition for the bank’s diversity efforts. Forte also was responsible for the Comerica Charitable Foundation, Corporate Contributions and Civic Affairs, overseeing corporate giving and community involvement programs.
                      </p>
                    </div>
                  </div> 
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Kenneth_Harris.jpg" alt=""/>
                      <div className="header-text__title">
                        Kenneth L. Harris
                      </div>
                      <div className="header-text__subtitle">
                        President and CEO, National Business League, Inc.
                      </div>
                      <p className='main-text__black'>Kenneth L. Harris currently serves as president and CEO of the National Business League, Inc. and has worked to advance minority and black-owned businesses throughout Michigan. Harris serves on the U.S. Black Chamber of Commerce Board of Directors and as Midwest director for the U.S. Black Chamber of Commerce. In June 2017, the Michigan Black Chamber of Commerce, Inc., the nation's largest African American chamber in the country, acquired and merged the National Business League (NBL), Inc., an organization founded by Booker T. Washington in 1900.
                      </p>
                    </div>
                  </div>   
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Debra_Hoge.jpg" alt=""/>
                      <div className="header-text__title">
                        Debra Homic Hoge
                      </div>
                      <div className="header-text__subtitle">
                        Global Director of Real Estate, General Motors Company
                      </div>
                      <p className='main-text__black'>Debra Homic Hoge is the global director of real estate at GM and is responsible for the acquisition, disposition and redevelopment of corporate real estate throughout the world. GM's portfolio consists of over 335 million square feet. She maintains a State of Michigan Brokers License, and has also received a Master of Corporate Real Estate (MCR) designation from CoreNet, a global real estate consortium where she now serves on the Global Board of Directors.
                      </p>
                    </div>
                  </div>   
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Nancy_Moody.png" alt=""/>
                      <div className="header-text__title">
                        Nancy J. Moody
                      </div>
                      <div className="header-text__subtitle">
                        Vice President of Public Affairs, DTE Energy
                      </div>
                      <p className='main-text__black'>Nancy J. Moody is vice president of Public Affairs for DTE Energy (NYSE: DTE), a Detroit-based diversified energy company involved in the development and management of energy-related businesses and services nationwide. Moody is responsible for Force for Growth and Prosperity work with DTE Energy's community-facing activities, including philanthropy through the DTE Energy Foundation, volunteerism, education and employment initiatives, environmental leadership, policy leadership, community outreach and economic progress.
                      </p>
                    </div>
                  </div> 
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Dwight_Phillips.jpg" alt=""/>
                      <div className="header-text__title">
                        Dwight W. Phillips
                      </div>
                      <div className="header-text__subtitle">
                      Member and Shareholder, Phifer, Phillips &amp; White, PC
                      </div>
                      <p className='main-text__black'>A native Detroiter, Dwight W. Phillips is a practicing attorney and shareholder in the law firm of Phifer, Phillips &amp; White, P.C. The firm has been located in downtown Detroit since its inception in 1981. Phillips is also the managing partner of Annis Historic Properties, P. C, which purchased and developed the L.B. King Building in 1986.
                      </p>
                    </div>
                  </div> 
                  <div className="c-card__board-members-card">
                    <div className="c-card__content">
                      <img className="c-card-thumbnail" src="/img/Dwight_Pierce.jpg" alt=""/>
                      <div className="header-text__title">
                        Phillip Pierce
                      </div>
                      <div className="header-text__subtitle">
                        Managing Member, Pierce, Monroe &amp; Associates LLC
                      </div>
                      <p className='main-text__black'>Phillip Pierce is the managing member of Pierce, Monroe &amp; Associates, which provides financial, management and information technology consulting services. He has extensive experience in financial and information systems consulting beginning with his employment with Arthur Andersen &amp; Company. In 1985 he joined Loren Monroe, former treasurer of the State of Michigan, to form Pierce, Monroe &amp; Associates, LLC. Pierce is nationally known for his expertise as he has led strategic planning efforts for more than forty different organizations.
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