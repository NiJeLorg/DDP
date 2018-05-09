import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false
    };
    this.toggleSubmenu = this.toggleSubmenu.bind(this);
  }

  toggleSubmenu() {
    this.setState({
      subMenuOpen: !this.state.subMenuOpen
    });
  }
  render() {
    return (
      <nav className="c-navbar">
        <Link to="/" className="logo">
          <img src="../../img/logo-white.svg" alt="" />
        </Link>
        <ul className="menu" role="navigation">
          <li>
            <p className="menu-item" onClick={this.toggleSubmenu}>
              Chapters
            </p>
            <ul
              className={`sub-menu__${
                this.state.subMenuOpen ? "open" : "closed"
              }`}
            >
              <li>01 Downtown In Context</li>
              <li>02 Public Life</li>
            </ul>
          </li>
          <li>
            <p className="menu-item">Contact</p>
          </li>
        </ul>
        <ul className="menu__mobile">
          <li>MENU</li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
