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
      chart: {},
      config: {},
      cols: [],
      rows: [],
    };
    this.toggleDataTable = this.toggleDataTable.bind(this);
    this.toggleDownloadBar = this.toggleDownloadBar.bind(this);
    this.cleanData = this.cleanData.bind(this);
    this.generateHeaders = this.generateHeaders.bind(this);
    this.generateRows = this.generateRows.bind(this);
  }
  static propTypes = {
    cols : React.PropTypes.array.isRequired,
    rows : React.PropTypes.array.isRequired
  }

  componentWillReceiveProps(nextProps) {
   this.setState({chart: nextProps.chart});
   this.setState({config: nextProps.config});
  }
  toggleDataTable(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.open) {
      this.setState({actionLabel: 'VIEW DATA'});
    } else {
      this.setState({actionLabel: 'HIDE DATA'});
      console.log(this.state.config);
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
    //console.log(this.state.chart);
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



  cleanData() {
    // create columns

    this.state.cols = [];
    if (typeof this.state.config !== "undefined" && typeof this.state.config.series !== "undefined") {
      if (this.state.config.series.length > 0 && this.state.config.series[0].tableRow) {
        Object.keys(this.state.config.series[0].tableRow).map(row => {
          if (row != 'id') {
            this.state.cols.push({key: row, label: row});
          }
        });
        // ensure that category object is first in the array
        let pos = this.state.cols.map(function(e) { return e.key; }).indexOf('Category');
        let categoryColumn = this.state.cols[pos];
        this.state.cols.splice(pos,1);
        this.state.cols.unshift(categoryColumn);
      }
    }

    this.state.rows = [];
    if (typeof this.state.config !== "undefined" && typeof this.state.config.series !== "undefined") {
      if (this.state.config.series.length > 0 && this.state.config.series[0].tableRow) {
        for (let i = 0; i < this.state.config.series.length; i++) {
          this.state.config.series[i].tableRow.id = i + 1;
          this.state.rows.push(this.state.config.series[i].tableRow);
          
        }
      }
    }
  }

  generateHeaders() {
    let cols = this.state.cols;  // [{key, label}]
    return cols.map(function(colData) {
        return <th key={colData.key}>{colData.label}</th>;
    });
  }
  
  generateRows() {
    let cols = this.state.cols,  // [{key, label}]
        data = this.state.rows;
    if (this.state.rows.length > 0) {
      return data.map(function(item) {
        //console.log(item);
          var cells = cols.map(function(colData) {
            return <td key={colData.key}>{item[colData.key]}</td>;
          });
          return <tr key={item.id}>{cells}</tr>;
      });
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

    this.cleanData();
    let headers = this.generateHeaders();
    let rows = this.generateRows();

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
              {headers}
            </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>


    );
  }

};

export default DataBar;