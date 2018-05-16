import React from "react";
import StoryHeader from "./story_header";
import StoryOne from "./stories/story_one";
import StoryTwo from "./stories/story_two";

const StoryNavigator = ({chapter}) => {
  let  story = "";
  console.log(chapter, "CHAPTERS");
  if(chapter.id === 1){
     story = <StoryOne />;
  }else if(chapter.id === 2){
     story = <StoryTwo />;
  }


  return (
    <div className={"c-story-navigator"}>
      {story}
    </div>
  );
};

export default StoryNavigator;
