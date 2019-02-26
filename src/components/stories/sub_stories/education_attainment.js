import React from 'react';
import EducationAttainmentBarChart from './../../charts/education_attainment_bar_chart';
import EducationAttainmentGroupedPieChart from './../../charts/education_attainment_grouped_pie_chart';
import DataBar from './../../charts/data_bar';

const WorkerEducationAttainment = () => {
    return (
        <div className='story-margin'>
            <h1 className='sub-sub-heading__purple' data-story-id="1"  data-story-overlay="Educational Attainment">Education</h1>
            <p className='main-text__black'>With over 10 higher education institutions in the Greater Downtown Area, Downtown Detroit provides opportunities to develop the talent pool for the region and the state. Detroit’s industries have been ever evolving and with that so has the higher education system, embracing the technology and startup culture.

            </p>

            <EducationAttainmentBarChart className={'chart'}/>

           <EducationAttainmentGroupedPieChart />

        </div>

    );
};

export default WorkerEducationAttainment;