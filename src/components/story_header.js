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
              Outine eu hexagon mollit cold-pressed cardigan ethical. Conequat
              vinyl officia excepteur microdosing air plant mollit aliquip
              quinoa cliche bespoke meditation messenger bag commodo kinfolk.
              Hell of esse before they sold out neutra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryHeader;
