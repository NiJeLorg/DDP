import React from 'react';
import DiversityAreaChart from './../../charts/downtown_diversity';
import DataBar from './../../charts/data_bar';


const Diversity = () => {
    return (
        <div>
          <h1> <span className="chapter-marker">2.</span>DIVERSITY</h1>
            <p>Downtown is more diverse and less segregated than the region. </p>
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