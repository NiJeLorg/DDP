import React from "react";

const StoryHeader = ({chapter}) => {
  let className = '';
  if (chapter.id === 1) {
    className = "c-story-header";
  } else if (chapter.id === 2) {
    className = "c-story-header c-story-header__public-life";
  } else if (chapter.id === 3) {
    className = "c-story-header c-story-header__value-of-biz";
  }
  return (
    <div className={className}>
      <div className="c-bevelled-box__story-header">
        <div className="c-chapter-card">
          <header>
            <div className="chapter-title">
              <h1 className="main-number-heading">{chapter.no}</h1>
              <h2 className="main-heading__white">
                {chapter.title}
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
            <h1 className="main-number-heading u-invisible-element">{chapter.no}</h1>
            <p className="main-text__white">
              {chapter.intro}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryHeader;
