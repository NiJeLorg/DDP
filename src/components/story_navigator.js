import React from 'react';
import StoryHeader from './story_header';
import StoryOne from  './stories/story_one';

const StoryNavigator = () => {
    return (
       <div className={"story-navigator"}>
           <StoryOne />
       </div>
    );
};

export default StoryNavigator;