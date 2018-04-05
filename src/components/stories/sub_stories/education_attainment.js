import React from 'react';
import EducationAttainmentBarChart from './../../charts/education_attainment_bar_chart';
import EducationAttainmentPieChart from './../../charts/education_attainment_pie_chart';
import DataBar from './../../charts/data_bar';

const EducationAttainment = () => {
    return (
        <div>
            <h2>EDUCATIONAL ATTAINMENT</h2>
            <p>While SE Michigan as a whole may struggle with retaining and attracting young and educated people,
                downtown has x % of residents with a college education. </p>
            <div>
                <div className="chart-container">
                    <EducationAttainmentBarChart className={'chart'}/>
                    <DataBar/>
                </div>
                <h2>2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </h2>
            </div>
            <p>Something about workers educational attainment Waistcoat normcore trust fund cloud bread asymmetrical
                neutra. Tacos kickstarter neutra fixie air plant mixtape, raw denim hoodie helvetica offal direct trade.
                Pug blog vexillologist ugh, paleo hoodie yr jianbing. Air plant activated charcoal hoodie waistcoat
                lo-fi adaptogen. Hashtag pour-over keytar tofu farm-to-table. Synth brunch squid tattooed, pok pok
                before they sold out etsy whatever bushwick.</p>
            <div>
                <div className="chart-container">
                    <div className="grouped-pie-chart">
                        <EducationAttainmentPieChart />
                        <EducationAttainmentPieChart />
                    </div>
                    <DataBar/>
                </div>
                <h2>2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </h2>
            </div>

        </div>

    );
};

export default EducationAttainment;