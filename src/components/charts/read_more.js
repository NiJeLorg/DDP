import React, {Component} from 'react';
import classNames from 'classnames';

class ReadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      downloadOpen: true,
      actionLabel: "READ MORE",
      actionDonwloadLabel: "READ MORE",
    };
    this.toggleDownloadBar = this.toggleDownloadBar.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({chart: nextProps.chart});

  }


  toggleDownloadBar(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.downloadOpen) {
      this.setState({actionDonwloadLabel: 'READ MORE'});
    } else {
      this.setState({actionDonwloadLabel: 'HIDE'});
    }
    this.setState({downloadOpen: !this.state.downloadOpen});
  }

  render() {

    let openDownloadBarClasses = classNames({
      'hidden': this.state.downloadOpen
    });


    let activeDownloadLabel = classNames({
      'active-label': !this.state.downloadOpen
    });
    return (
      <div className="c-data">
        <div className="bar">
          {/*<a href="#" className={activeLabel} onClick={this.toggleDataTable}>{this.state.actionLabel}</a>*/}
          {/*<div className="vertical-divider"></div>*/}
          <a href="#" className={activeDownloadLabel} onClick={this.toggleDownloadBar}>{this.state.actionDonwloadLabel}</a>

        </div>
        <div className={openDownloadBarClasses}>
          {this.props.readmore}
        </div>

      </div>


    );
  }

};

export default ReadMore;