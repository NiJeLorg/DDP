import React from 'react';
import StoryHeader from './story_header';
import StoryOne from  './stories/story_one';

const StoryNavigator = () => {
    return (
       <div className={"c-story-navigator"}>
           <StoryHeader />
           <StoryOne />
       </div>
    );
};

export default StoryNavigator;