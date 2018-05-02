import React from "react";
import StoryHeader from "./story_header";
import StoryOne from "./stories/story_one";

const StoryNavigator = () => {
  return (
    <div className={"c-story-navigator"}>
      {/* <div className="c-data-drawer-nav">
        <h1 className="title">Data Drawer</h1>
      </div> */}
      <StoryOne />
    </div>
  );
};

export default StoryNavigator;
