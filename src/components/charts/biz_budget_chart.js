import React, {Component} from 'react';
import _ from 'lodash';
import * as d3 from 'd3'; 
import D3ComplexPie from "../../utils/d3_complex_pie";

class BIZBudgetChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: [],
      data: [],
    };
  }



    componentDidMount() {
        
        let overallBudgetData = [
            {
                name: "Administration",
                budget: 788020
            },
            {
                name: "BIZ direct expenses",
                budget: 53230
            },
            {
                name: "Programs",
                budget: 3758710
            },
        ];

        let programBudgetData = [
            {
                name: "Street landscaping",
                budget: 400000,
                description: "Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar.",
                categories: [
                    {
                        name: "Lawn mowing",
                        description: ""
                    },
                    {
                        name: "Tree pruning",
                        description: ""
                    },
                    {
                        name: "Seasonal planting",
                        description: ""
                    },
                    {
                        name: "Maintenance of sidewalk planters and boulevard medians",
                        description: ""
                    },
                ]
            },
            {
                name: "Supplemental lighting",
                budget: 175000,
                description: "Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar.",
                categories: [
                    {
                        name: "Winter seasonal decorative lighting",
                        description: ""
                    },
                    {
                        name: "Accent lighting",
                        description: ""
                    },
                ]
            },
            {
                name: "Parks and common areas",
                budget: 678710,
                description: "Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar.",
                categories: [
                    {
                        name: "Supplemental beautification in Downtown parks",
                        description: ""
                    },
                ]                
            },
            {
                name: "Downtown Ambassadors",
                budget: 1965000,
                description: "Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar.",
                categories: [
                    {
                        name: "Litter pick up and street cleaning",
                        description: ""
                    },
                    {
                        name: "Visitor assistance",
                        description: ""
                    },
                    {
                        name: "Trash receptacle maintenance",
                        description: ""
                    },
                    {
                        name: "Graffiti removal",
                        description: ""
                    },
                    {
                        name: "Winter snow tidying",
                        description: ""
                    },
                ]
            },
            {
                name: "Communications, marketing, outreach and data",
                budget: 165000,
                description: "Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar.",
                categories: [
                    {
                        name: "BIZ Connect community events",
                        description: ""
                    },
                    {
                        name: "Reports and research",
                        description: ""
                    },
                    {
                        name: "Newsletters and updates",
                        description: ""
                    },
                    {
                        name: "Data analysis and benchmarking",
                        description: ""
                    },
                ]
            },
            {
                name: "Infrastructre and planning",
                budget: 100000,
                description: "Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar.",
                categories: [
                    {
                        name: "Planning for transformational downtown projects",
                        description: ""
                    },
                ]                
            },
            {
                name: "Safety",
                budget: 275000,
                description: "Lorem ipsum dolor amet helvetica brunch readymade mumblecore la croix, pop-up yr kombucha vice. Stumptown austin typewriter williamsburg XOXO banjo kitsch, gentrify kale chips humblebrag drinking vinegar whatever mustache keytar.",
                categories: [
                    {
                        name: "Park security guards",
                        description: ""
                    },
                    {
                        name: "Security patrols",
                        description: ""
                    },
                    {
                        name: "Regular coordination meetings with DPD",
                        description: ""
                    },
                ]                  
            },
        ];


        let config = {
            'x_domain_normalize':1,
            'x_axis_format':"",
            'x_axis_text':"BIZ Assessment by Year"
        }
        // D3 Code to create the chart
        this._chart = D3ComplexPie.create(
            this._rootNode,
            overallBudgetData,
            programBudgetData,
            config
        );
    }

    componentDidUpdate() {
        // D3 Code to update the chart
        D3ComplexPie.update(
           this._rootNode,
           this.props.overallBudgetData,
           this.props.programBudgetData,
           this.props.config,
           this._chart
        );
    }

    componentWillUnmount() {
        D3ComplexPie.destroy(this._rootNode);
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

export default BIZBudgetChart;
