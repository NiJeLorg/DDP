import React from "react";
import { Link } from "react-router-dom";
const Chapters = () => {
  return (
    <div className="ul-height-100">
      <div className="c-main-logo">
        <img src="./../img/logo.svg" alt="" />
      </div>
      <div className="c-main-jumbotron l-flex-flex-end">
        <div className="c-card__chapters-card c-bevelled-box__chapters l-flex-center-center">
          <div className="c-card__content">
            <h2 className="main-heading__purple">
              Chapters
            </h2>
            <div className="c-chapter-markers">
              <Link
                to="/story/1"
                className="chapter-card c-bevelled-box__chapter-card"
              >
                <span className="chapter-marker">01</span>
                <div className="chapter-title">
                  <h3 className='sub-heading'>Downtown in Context</h3>
                </div>
              </Link>
              <Link
                to="/story/2"
                className="chapter-card c-bevelled-box__chapter-card"
              >
                <span className="chapter-marker">02</span>
                <div className="chapter-title">
                  <h3 className='sub-heading'>Public Life</h3>
                </div>
              </Link>
              <Link
                to="/story/3"
                className="chapter-card c-bevelled-box__chapter-card"
              >
                <span className="chapter-marker">03</span>
                <div className="chapter-title">
                  <h3 className='sub-heading'>The Value of the BIZ</h3>
                </div>
              </Link>
              <div className="chapter-card c-bevelled-box__chapter-card">
                <span className="chapter-marker ul-greyedout-text">04</span>
                <div className="chapter-title">
                  <h3 className='sub-heading ul-greyedout-text'>Coming Soon</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
