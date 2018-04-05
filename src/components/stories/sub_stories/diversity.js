import React from 'react';
import DiversityAreaChart from './../../charts/downtown_diversity';
import DataBar from './../../charts/data_bar';

const Diversity = () => {
    return (
        <div>
            <h2>DIVERSITY</h2>
            <p>Downtown is more diverse and less segregated than the region. </p>
            <div>
                <div className="chart-container">
                    <DiversityAreaChart className={'chart'}/>
                    <DataBar/>
                </div>
                <h2>2016 CENSUS RESIDENTS EDUCATIONAL ATTAINMENT </h2>
            </div>


        </div>

    );
};

export default Diversity;