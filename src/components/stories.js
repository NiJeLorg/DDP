import React from 'react';
import StoryNavigator from './story_navigator';
import GeoMap from './geomap';
import DataDrawer from './data_drawer';
import MobileNavStoryMap from './mobile_nav_story_map';
class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileView: (window.innerWidth < 500),
            view: 'story'
        }
    }

    handleViewSelect = (e) => {
        this.setState({ view: e.target.name });
    }
    
    render() {
        return (
            <div className="c-stories">
                { 
                    this.state.mobileView ? 
                        <MobileNavStoryMap
                            view={this.state.view}
                            handleViewSelect={this.handleViewSelect}
                        /> : <DataDrawer />
                }
                
                { (!this.state.mobileView || this.state.mobileView && this.state.view === 'story' ) ? <StoryNavigator /> : null }

                { (!this.state.mobileView || this.state.mobileView && this.state.view === 'map' ) ? <GeoMap /> : null }
                
            </div>
        );
    }
};

export default Stories;