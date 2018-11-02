import React, {Component} from 'react';
import _ from 'lodash';
import mapConfig from '../../utils/maps';
import D3BubbleColumn from "../../utils/d3_bubble_column";

class DistributionOfRevenueChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: [],
      data: [],
    };
  }



    componentDidMount() {
      let data = mapConfig.ASSESSMENT_PARCEL_DATA_FILE;

      let config = {
          'x_domain_normalize':5,
          'x_axis_format':"$.0s",
          'x_axis_text':"Annual Assessment ($)"
      }
      // D3 Code to create the chart
      this._chart = D3BubbleColumn.create(
          this._rootNode,
          data,
          config
      );
    }

    componentDidUpdate() {
        // D3 Code to update the chart
        D3BubbleColumn.update(
          this._rootNode,
          this.props.data,
          this.props.config,
          this._chart
       );
    }

    componentWillUnmount() {
        D3BubbleColumn.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (
            <div className="c-bubble-column-svg" ref={this._setRef.bind(this)} />
        );
    }
}

export default DistributionOfRevenueChart;
