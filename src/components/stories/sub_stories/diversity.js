import React from 'react';
import DiversityAreaChart from './../../charts/downtown_diversity';
import DataBar from './../../charts/data_bar';


const Diversity = () => {
    return (
        <div>
          <h1 className="sub-sub-heading__purple"> <span className='ul-yellow-color'>II.</span>DIVERSITY</h1>
            <p className='main-text__black'>Downtown is more diverse and less segregated than the region. </p>
            <div>
              <span className="chart-header">2016 CENSUS RESIDENTS DIVERSITY </span>
                <div className="chart-container">
                    <DiversityAreaChart className={'chart'}/>
                    <DataBar/>
                </div>
            </div>


        </div>

    );
};

export default Diversity;