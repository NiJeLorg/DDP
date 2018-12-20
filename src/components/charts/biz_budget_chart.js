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
                type: "2018-2019 Budget:",
                name: "Street landscaping",
                budget: 400000,
                description: "The BIZ provides landscaping services for designated parks, medians and curbside planters and other green spaces to make Downtown a more beautiful destination. This includes mowing, weeding, seasonal planting and more.",
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
                type: "2018-2019 Budget:",
                name: "Supplemental lighting",
                budget: 175000,
                description: "While the City provides basic lighting for visibility, the BIZ provides supplemental lighting to improve safety as well as seasonal lighting around the winter holidays.",
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
                type: "2018-2019 Budget:",
                name: "Parks and common areas",
                budget: 678710,
                description: "The BIZ works in collaboration with other DDP departments to create wonderful downtown parks. Specifically, it provides landscape maintenance in Capitol and Grand Circus parks and ambassador services in Campus Martius, Cadillac Square, Capitol Park, Grand Circus Park, Rivard Plaza and Along the Detroit RiverFront.",
                categories: [
                    {
                        name: "Supplemental beautification in Downtown parks",
                        description: ""
                    },
                ]                
            },
            {
                type: "2018-2019 Budget:",
                name: "Downtown Ambassadors",
                budget: 1965000,
                description: "The Downtown Ambassadors are a vital part of Downtown’s vibrancy. In addition to removing trash from sidewalks and streets and collecting it from receptacles, our ambassador team is there to provide information to visitors, provide an extra layer of security, and help solve everyday problems downtown.",
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
                type: "2018-2019 Budget:",
                name: "Communications, marketing, outreach and data",
                budget: 165000,
                description: "The BIZ operates a robust marketing and outreach program geared toward disseminating important information to residents, businesses, visitors and other stakeholders. Additionally it coordinates networking and learning opportunities to businesses, and provides data and analysis on the state of Downtown and surrounding areas.",
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
                type: "2018-2019 Budget:",
                name: "Infrastructre and planning",
                budget: 100000,
                description: "The BIZ works closely with the City to help coordinate and plan important special projects and infrastructure enhancements.",
                categories: [
                    {
                        name: "Planning for transformational downtown projects",
                        description: ""
                    },
                ]                
            },
            {
                type: "2018-2019 Budget:",
                name: "Safety",
                budget: 275000,
                description: "The BIZ provides for security personnel to patrol Downtown and the Detroit RiverFront. It also coordinates monthly inter-agency safety and security strategy meetings and provides security for special events.",
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
