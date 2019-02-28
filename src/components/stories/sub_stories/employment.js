import React from 'react';


const Employment = () => {
  return (
    <div className='story-margin'>
      <h1 className="sub-sub-heading__purple" data-story-id="3" data-story-overlay="Worker - Downtown">EMPLOYMENT</h1>
      <p className='main-text__black'>Downtown Detroit is a major draw for employees throughout the region, with a
        number of large, fortune 500 companies calling Downtown home. More than 70,000 people work Downtown daily.
        People come from all over the region every day to work Downtown. The graphs below show the number of people
        working Downtown broken down by where they live.</p>
      <div>
        <span className="chart-header">The Ten Largest Contributors of Workers to Downtown Detroit by Municipality</span>
        <div>
          <img className="employment-svg" src="/img/employment_graphic.svg" alt=""/>
        </div>
        <div className="chart-footer">Source: Longitudinal Employer-Household Dynamics (LEHD), 2015. Data Driven Detroit, April 2018.</div>
      </div>
      <p className='main-text__black'>By county, the five largest contributors of workers to Downtown Detroit are: 
        <ol>
          <li>Wayne County (34,811)</li>
          <li>Oakland County (17,358)</li>
          <li>Macomb County (11,558)</li>
          <li>St. Clair County (952)</li>
          <li>Livingston County (546)</li>
        </ol>
      
      
      </p>   


    </div>

  );
};

export default Employment;