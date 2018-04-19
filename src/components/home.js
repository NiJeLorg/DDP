import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="u-bg-cover l-full-height l-top-padding">
      <div className="c-logo">
        <img src="./../img/logo.svg" alt="" />
      </div>
      <div className="u-center-item">
        <div className="c-card c-card--home u-beveled-box u-center-item">
          <div className="c-card__content l-col-layout">
            <h2>Downtown is Happening</h2>
            <p>
              Lorem ipsum dolor amet drinking vinegar lumbersexual taiyaki
              knausgaard leggings hella microdosing kitsch hell of green juice
              hot chicken. Ugh hexagon snackwave offal distillery taiyaki swag
              twee cliche coloring book irony vegan gastropub. Sartorial four
              dollar toast
            </p>
            <Link className="c-btn c-btn--primary" to="/chapters">
              {" "}
              View Chapters
              <span className="u-caret">
                <i class="down" />
              </span>
            </Link>Ï
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
