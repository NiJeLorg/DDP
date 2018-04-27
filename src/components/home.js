import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="ul-height-100">
      <div className="c-main-logo">
        <img src="./../img/logo.svg" alt="" />
      </div>
      <div className="c-main-jumbotron l-flex-center-center">
        <div className="c-bevelled-box c-card__home">
          <div className="c-card__content l-col-layout">
            <h2 className="main-heading__purple">Downtown is Happening</h2>
            <p className="main-text__black">
              Lorem ipsum dolor amet drinking vinegar lumbersexual taiyaki
              knausgaard leggings hella microdosing kitsch hell of green juice
              hot chicken. Ugh hexagon snackwave offal distillery taiyaki swag
              twee cliche coloring book irony vegan gastropub. Sartorial four
              dollar toast
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
