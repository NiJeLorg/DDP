import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
const RailMenu = () => {
  return (
    <div className="c-data-drawer-nav__sticky">
      <h2 className="sub-heading">Sections</h2>
      <div className="menu-container__sticky">
        <div className="menu-item">
          <Link smooth to="#whatisthebiz">
            <h4>I. What is the BIZ?</h4>
          </Link>
        </div>
        <div className="menu-item">
          <Link smooth to="#whodoesthebizserve">
            <h4>II. Who Does the BIZ Serve?</h4>
          </Link>
        </div>
        <div className="menu-item">
          <Link smooth to="#howisthebizfunded">
            <h4>III. How is the BIZ Funded?</h4>
          </Link>
        </div>
        <div className="menu-item">
          <Link smooth to="#wheredoesbizinvestmentgo">
            <h4>IV. Where Does BIZ Investment Go?</h4>
          </Link>
        </div>
        <div className="menu-item">
          <Link smooth to="#whatstheimpactofbizservicesonthecommunity">
            <h4>V. What's the Impact of BIZ Services on the Community?</h4>
          </Link>
        </div>
      </div>
    </div>


  );
};

export default RailMenu;
