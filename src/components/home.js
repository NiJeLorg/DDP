import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="ul-height-100">
      <div className="c-main-logo">
        <img src="./../img/BIZ_Logo_2_28_19.png" alt="" />
      </div>
      <div className="c-main-jumbotron l-flex-center-center">
        <div className="c-bevelled-box c-card__home">
          <div className="c-card__content l-col-layout">
            <h2 className="main-heading__purple">Downtown is Happening</h2>
            <p className="main-text__black">
              Downtown Detroit is home to major regional and international employers, world-class public spaces, arts and entertainment, and the location of all four of the major Detroit professional sports teams. With all of these features and more, Downtown continues to grow in popularity, new residents, and businesses.
            </p>
            <div className="l-flex-center">
              <Link className="c-btn c-btn--primary" to="/chapters">
                View Chapters
                <img src="./../img/caret.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
        <Link className="c-btn--primary__mobile" to="/chapters">
          <img src="./../img/down-caret-mobile.svg" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
