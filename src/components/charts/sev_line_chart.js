import React, {Component} from 'react';
import _ from 'lodash';
import * as d3 from 'd3'; 
import D3Line from "../../utils/d3_line";

class SEVLineChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: [],
      data: [],
    };
  }



    componentDidMount() {
        
        let data = d3.range(0, 50100000, 100000).map(function(v) {
            return {
                x: v,
                y: 0.003 * v
            };
        });

        let config = {
            'x_domain_normalize':5,
            'x_axis_format':"$.0s",
            'x_axis_text':"Assessed value ($)"
        }
        // D3 Code to create the chart
        this._chart = D3Line.create(
            this._rootNode,
            data,
            config
        );
    }

    componentDidUpdate() {
        // D3 Code to update the chart
        D3Line.update(
           this._rootNode,
           this.props.data,
           this.props.config,
           this._chart
        );
    }

    componentWillUnmount() {
        D3Line.destroy(this._rootNode);
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

export default SEVLineChart;
