import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {

  render() {
    return (
      <nav className="c-footer">
        <ul className="menu" role="navigation">
          <li>
            <a className="menu-item" href="http://downtowndetroit.org/">Downtown Detroit Partnership &copy; 2018 </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Footer;
