import React from "react";

const StoryHeader = () => {
  return (
    <div className="c-story-header">
      <div className="c-bevelled-box__story-header">
        <div className="c-chapter-card">
          <header>
            <div className="chapter-title">
              <h1 className="main-number-heading">01</h1>
              <h2 className="main-heading__white">
                Downtown in Context
                {/* <ul className="story-page-indicator">
                <li className="active" />
                <li />
                <li />
                <li />
              </ul> */}
              </h2>
            </div>
          </header>
          <div className="chapter-title">
            <h1 className="main-number-heading u-invisible-element">01</h1>
            <p className="main-text__white">
              Downtown Detroit has long been known as a major regional hub for jobs and workers due to the presence of large Regional and international employers such as General Motors, Fiat/Chrysler, Quicken Loans, Little Caesar’s Pizza, DTE Energy, and others. But it is increasingly also becoming a place for people to live. As of the 2016 American Community Survey, there were xxxx people calling Downtown Detroit home. The residents of Downtown Detroit are proud Detroiters. They are a diverse group of people racially, economically and in age.  The following series of maps and graph’s serve to characterize Downtown residents in the context of the region and compare them against residents of other downtowns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryHeader;
