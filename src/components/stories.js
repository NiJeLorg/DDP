import React from "react";
import StoryNavigator from "./story_navigator";
import GeoMap from "./geomap";
import DataDrawer from "./data_drawer";
import MobileNavStoryMap from "./mobile_nav_story_map";
class Stories extends React.Component {
  render() {
    return (
      <div className="c-stories">
        <DataDrawer />
        <StoryNavigator />
        <GeoMap />
      </div>
    );
  }
}

export default Stories;
