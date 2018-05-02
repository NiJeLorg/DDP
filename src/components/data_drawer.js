import React, { Component } from "react";
import ReactDrawer from "react-drawer";
import "react-drawer/lib/react-drawer.css";

class DataDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="ul-height-100">
        <div
          className={`c-drawer-container__${
            this.state.open ? "closed" : "open"
          }`}
        >
          <a
            onClick={this.toggleDrawer}
            disabled={this.state.open && !this.state.noOverlay}
            className="c-drawer-button"
          >
            DATA DRAWER
          </a>
        </div>
        <div
          className={`c-data-drawer-nav__${
            this.state.open ? "open" : "closed"
          }`}
        >
          <div className="l-flex-flex-end">
            <button onClick={this.toggleDrawer} className="c-cancel-button">
              X
            </button>
          </div>
          <h2 className="sub-heading">Data Drawer</h2>
          <div className="menu-container">
            <div className="menu-item">
              <h4>Detroit In Context</h4>
              <ul className="sub-menu">
                <li>Education Attainment</li>
                <li>Diversity</li>
                <li>Employment</li>
                <li>Housing</li>
                <li>Crime</li>
              </ul>
            </div>
            <div className="menu-item">
              <h4>Public Life</h4>
              <ul className="sub-menu">
                <li>Another Category</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataDrawer;
