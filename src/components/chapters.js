import React from 'react';
import { Link } from 'react-router-dom';
const Chapters = () => {
    return (
        <div className="u-bg-cover l-full-height l-flex-row">
            <div className="c-logo">
                <img src="./../img/logo.svg" alt=""/>
            </div>
            <div className="u-top-right">
                <div className="c-card c-card--lg c-card--no-margin u-beveled-box-bl u-center-item">
                    <div className="c-card__content l-col-layout
                ">
                        <h2>Chapters</h2>
                        <hr/>
                        <div className="c-chapter-markers">
                            <Link to="/story" className="chapter-card u-beveled-box-marker">
                                <span className="chapter-marker">01</span>
                                <div className="chapter-title">
                                    <h3 className="u-center-text">Downtown in Context</h3>
                                </div>
                            </Link>
                            <Link to="/story" className="chapter-card u-beveled-box-marker">
                                <span className="chapter-marker">02</span>
                                <div className="chapter-title">
                                    <h3 className="u-center-text">Public Life</h3>
                                </div>
                            </Link>
                            <Link to="/story" className="chapter-card u-beveled-box-marker">
                                <span className="chapter-marker">03</span>
                                <div className="chapter-title">
                                    <h3 className="u-center-text">Coming Soon</h3>
                                </div>
                            </Link>
                            {/*<Link to="/story" className="chapter-card u-beveled-box-marker">*/}
                                {/*<span className="chapter-marker">03</span>*/}
                                {/*<div className="chapter-title">*/}
                                    {/*<h3 className="u-center-text">Coming Soon</h3>*/}
                                {/*</div>*/}
                            {/*</Link>*/}
                            {/*<Link to="/story" className="chapter-card u-beveled-box-marker">*/}
                                {/*<span className="chapter-marker">03</span>*/}
                                {/*<div className="chapter-title">*/}
                                    {/*<h3 className="u-center-text">Coming Soon</h3>*/}
                                {/*</div>*/}
                            {/*</Link>*/}
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default Chapters;