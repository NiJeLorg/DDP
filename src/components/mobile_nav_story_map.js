import React from "react";

class MobileNavStoryMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          view: this.props.view
        };
        this.handleViewSelect = this.handleViewSelect.bind(this);
    }

    handleViewSelect() {
      //console.log(this);
      this.setState({view: 'map'});
      console.log(this);
    }

    

    render() {
        return (
            <div className={"c-mobile-nav-story-map"}>
              <button className={`nav-story-button__${ (this.state.view === 'story') ? 'active' : 'inactive' }`} name="story" onClick={this.handleViewSelect}>Story View</button>
              <button className={`nav-story-button__${ (this.state.view === 'map') ? 'active' : 'inactive' }`} name="map" onClick={this.handleViewSelect}>Map View</button>
            </div>
          );
    }
};

export default MobileNavStoryMap;
