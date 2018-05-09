import React from 'react';
import EducationAttainmentBarChart from './../../charts/education_attainment_bar_chart';
import EducationAttainmentGroupedPieChart from './../../charts/education_attainment_grouped_pie_chart';
import DataBar from './../../charts/data_bar';

const WorkerEducationAttainment = () => {
    return (
        <div>
            <h1 className='sub-sub-heading__purple'><span className='ul-yellow-color'>I.</span>EDUCATIONAL ATTAINMENT</h1>
            <p className='main-text__black'>Outine eu hexagon mollit cold-pressed cardigan ethical. Conequat vinyl officia excepteur microdosing air plant mollit aliquip quinoa cliche bespoke meditation messenger bag commodo kinfolk. Hell of esse before they sold out neutra. </p>
             <div>
                <span className="chart-header">2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </span>
                <div className="chart-container">
                    <EducationAttainmentBarChart className={'chart'}/>
                    <DataBar/>
                </div>

            </div>
            <p className='main-text__black'>Something about workers educational attainment Waistcoat normcore trust fund cloud bread asymmetrical
                neutra. Tacos kickstarter neutra fixie air plant mixtape, raw denim hoodie helvetica offal direct trade.
                Pug blog vexillologist ugh, paleo hoodie yr jianbing. Air plant activated charcoal hoodie waistcoat
                lo-fi adaptogen. Hashtag pour-over keytar tofu farm-to-table. Synth brunch squid tattooed, pok pok
                before they sold out etsy whatever bushwick.</p>
           <EducationAttainmentGroupedPieChart />

        </div>

    );
};

export default WorkerEducationAttainment;