import React from 'react';
import EducationAttainment from './sub_stories/education_attainment';
import Diversity from './sub_stories/diversity';
import IncomeAffordability from './sub_stories/income_affordability';
import Employment from './sub_stories/employment';
const StoryOne = () => {
    return (
        <div className={'story-content'}>
            <EducationAttainment />
            <Diversity />
            <Employment/>
            <IncomeAffordability />
        </div>

    );
};

export default StoryOne;