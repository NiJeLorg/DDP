import React from 'react';
import EducationAttainment from './sub_stories/education_attainment';
import Diversity from './sub_stories/diversity';
const StoryOne = () => {
    return (
        <div className={'story-content'}>
            <p className={"story-intro justify"}>
                Lorem ipsum dolor amet bushwick master cleanse tote bag brooklyn pork belly. Paleo iPhone gochujang occupy vegan selvage blue bottle mustache. Mlkshk bitters cornhole flexitarian flannel cold-pressed. Green juice organic austin selvage occupy heirloom health goth.
            </p>
            <EducationAttainment />
            <Diversity />
        </div>

    );
};

export default StoryOne;