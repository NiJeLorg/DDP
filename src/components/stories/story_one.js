import React from 'react';
import EducationAttainment from './sub_stories/education_attainment';
import Diversity from './sub_stories/diversity';
const StoryOne = () => {
    return (
        <div className={'story-content'}>
            <EducationAttainment />
            <EducationAttainment />
        </div>

    );
};

export default StoryOne;