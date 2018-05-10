import React, {Component} from 'react';
import classNames from 'classnames';

class DataBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      downloadOpen: true,
      actionLabel: "VIEW DATA",
      actionDonwloadLabel: "DOWNLOAD",
      chart: {}
    };
    this.toggleDataTable = this.toggleDataTable.bind(this);
    this.toggleDownloadBar = this.toggleDownloadBar.bind(this);
  }
  componentWillReceiveProps(nextProps) {
   this.setState({chart: nextProps.chart});

  }
  toggleDataTable(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.open) {
      this.setState({actionLabel: 'VIEW DATA'});
    } else {
      this.setState({actionLabel: 'HIDE DATA'});
    }
    this.setState({open: !this.state.open});
  }

  toggleDownloadBar(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.downloadOpen) {
      this.setState({actionDonwloadLabel: 'DOWNLOAD'});
    } else {
      this.setState({actionDonwloadLabel: 'HIDE DOWNLOAD'});
    }
    this.setState({downloadOpen: !this.state.downloadOpen});
  }
  export(exportType) {
    console.log(this.state.chart);
    if(exportType === 'PNG')
    {
      this.state.chart.exportChart({type: 'image/png', filename: 'my-png'}, {subtitle: {text:''}});
    }
    if(exportType === 'JPEG')
    {
      this.state.chart.exportChart({type: 'image/jpeg', filename: 'my-jpg'}, {subtitle: {text:''}});
    }
    if(exportType === 'PDF')
    {
      this.state.chart.exportChart({type: 'application/pdf', filename: 'my-pdf'}, {subtitle: {text:''}});
    }
    if(exportType === 'SVG')
    {
      this.state.chart.exportChart({type: 'image/svg+xml', filename: 'my-svg'}, {subtitle: {text:''}});
    }
  }
  render() {
    let openDataTableClasses = classNames({
      'table': true,
      'hidden': this.state.open
    });
    let openDownloadBarClasses = classNames({
      'hidden': this.state.downloadOpen
    });

    let activeLabel = classNames({
      'active-label': !this.state.open
    });

    let activeDownloadLabel = classNames({
      'active-label': !this.state.downloadOpen
    });
    return (
      <div className="c-data">
        <div className="bar">
          <a href="#" className={activeLabel} onClick={this.toggleDataTable}>{this.state.actionLabel}</a>
          {/*<div className="vertical-divider"></div>*/}
          {/*<a href="#" className={activeDownloadLabel} onClick={this.toggleDownloadBar}>{this.state.actionDonwloadLabel}</a> */}

        </div>
        <div className={openDownloadBarClasses}>
          <ul>
            <li><a onClick={event => this.export('PNG')}>Download PNG</a></li>
            <li><a onClick={event => this.export('JPEG')}>Download JPEG</a></li>
            <li><a onClick={event => this.export('SVG')}>Download SVG</a></li>
            <li><a onClick={event => this.export('PDF')}>Download PDF</a></li>
          </ul>


        </div>
        <div className={openDataTableClasses}>
          <table>
            <thead>
            <tr>
              <th></th>
              <th>Detroit</th>
              <th>Chicago</th>
              <th>Pittsburgh</th>
              <th>Baltimore</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>No degree</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>High School</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>Some College</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>Bachelors</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>Post Grad</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
              <td>10%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>


    );
  }

};

export default DataBar;