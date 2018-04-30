import React from 'react';
import Navigation from './navigation';
import StoryHeader from './story_header';
import Stories from './stories';
const StoryBoard = () => {
    return (
        <div className="c-story-board">
            <Navigation />
            <StoryHeader />
            <Stories />
        </div>
    );
};

export default StoryBoard;