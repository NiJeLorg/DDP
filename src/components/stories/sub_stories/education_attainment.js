import React from 'react';
import EducationAttainmentBarChart from './../../charts/education_attainment_bar_chart';
import EducationAttainmentGroupedPieChart from './../../charts/education_attainment_grouped_pie_chart';
import DataBar from './../../charts/data_bar';

const WorkerEducationAttainment = () => {
    return (
        <div>
            <h1 className='sub-sub-heading__purple' data-story-id="1"  data-story-overlay="Education Attainment"><span className='ul-yellow-color'>I.</span>Educational Attainment, Downtown Detroit in Regional Context</h1>
            <p className='main-text__black'>The world’s top companies frequently emphasize the need for highly educated people to fill the ranks of their workforces.  Because of this they often locate in places where there are lots of potential employees with a high level of educational attainment and skilled workforce. In order to attract those companies and the jobs they provide an area has a competitive advantage if its population is highly educated. In addition, those people with higher levels of education are likely to earn more over their lifetime. Downtown Detroit encourages an investment in people by supporting efforts to increase levels of education among the residents of the City.
            </p>

            <EducationAttainmentBarChart className={'chart'}/>

           <EducationAttainmentGroupedPieChart />

        </div>

    );
};

export default WorkerEducationAttainment;