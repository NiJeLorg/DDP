import React from 'react';

const StoryHeader = () => {
    return (
        <div className="c-story-header">
            <h4>STORY</h4>
            <div className="story-details">
                <h1>Downtown Detroit in Context</h1>
                <div className="story-pagination">
                    <a  className="btn btn-prev">PREV</a>
                    <a  className="btn btn-next">NEXT</a>
                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    );
};

export default StoryHeader;