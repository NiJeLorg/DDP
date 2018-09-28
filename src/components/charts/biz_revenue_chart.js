import React, {Component} from 'react';
import _ from 'lodash';
import * as d3 from 'd3'; 
import D3LineWide from "../../utils/d3_line_wide";

class BIZRevenueChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: [],
      data: [],
    };
  }



    componentDidMount() {
        
        let data = [
            {
                x: 2014,
                y: 4002576
            },
            {
                x: 2015,
                y: 4008309
            },
            {
                x: 2016,
                y: 4014355
            },
            {
                x: 2017,
                y: 4077192
            },
            {
                x: 2018,
                y: 4165972
            },
        ];

        let config = {
            'x_domain_normalize':1,
            'x_axis_format':"",
            'x_axis_text':"BIZ Assessment by Year"
        }
        // D3 Code to create the chart
        this._chart = D3LineWide.create(
            this._rootNode,
            data,
            config
        );
    }

    componentDidUpdate() {
        // D3 Code to update the chart
        D3LineWide.update(
           this._rootNode,
           this.props.data,
           this.props.config,
           this._chart
        );
    }

    componentWillUnmount() {
        D3LineWide.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (
            <div className="c-table-svg" ref={this._setRef.bind(this)} />
        );
    }
}

export default BIZRevenueChart;
