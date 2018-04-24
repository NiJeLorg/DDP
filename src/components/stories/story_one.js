import React from 'react';
import EducationAttainment from './sub_stories/education_attainment';
import Diversity from './sub_stories/diversity';
import IncomeAffordability from './sub_stories/income_affordability';
const StoryOne = () => {
    return (
        <div className={'story-content'}>
            <EducationAttainment />
            <Diversity />
          <IncomeAffordability/>
        </div>

    );
};

export default StoryOne;