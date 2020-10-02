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
                budget: 941000
            },
            {
                name: "Programs",
                budget: 3990000
            },
        ];

        let programBudgetData = [
            {
                type: "2020-2021 Budget:",
                name: "Street Landscaping",
                budget: 420000,
                description: "The BIZ provides landscaping services for designated parks, medians and curbside planters and other green spaces to make Downtown a more beautiful destination. This includes mowing, weeding, seasonal planting and more.",
                categories: [
                    {
                        name: "Lawn Mowing",
                        description: ""
                    },
                    {
                        name: "Tree Pruning",
                        description: ""
                    },
                    {
                        name: "Seasonal Planting",
                        description: ""
                    },
                    {
                        name: "Maintenance of Sidewalk Planters and Boulevard Medians",
                        description: ""
                    },
                ]
            },
            {
                type: "2020-2021 Budget:",
                name: "Supplemental Lighting",
                budget: 175000,
                description: "While the City provides basic lighting for visibility, the BIZ provides supplemental lighting to improve safety as well as seasonal lighting around the winter holidays.",
                categories: [
                    {
                        name: "Winter Seasonal Decorative Lighting",
                        description: ""
                    },
                    {
                        name: "Accent Lighting",
                        description: ""
                    },
                ]
            },
            {
                type: "2020-2021 Budget:",
                name: "Parks and Common Areas",
                budget: 700000,
                description: "The BIZ works in collaboration with other DDP departments to create wonderful downtown parks. Specifically, it provides landscape maintenance in Capitol and Grand Circus parks and ambassador services in Campus Martius, Cadillac Square, Capitol Park, Grand Circus Park, Rivard Plaza and Along the Detroit RiverFront.",
                categories: [
                    {
                        name: "Supplemental Beautification in Downtown Parks",
                        description: ""
                    },
                ]                
            },
            {
                type: "2020-2021 Budget:",
                name: "Downtown Ambassadors",
                budget: 2145000,
                description: "The Downtown Ambassadors are a vital part of Downtown’s vibrancy. In addition to removing trash from sidewalks and streets and collecting it from receptacles, our ambassador team is there to provide information to visitors, provide an extra layer of security, and help solve everyday problems downtown.",
                categories: [
                    {
                        name: "Litter Pick Up and Street Cleaning",
                        description: ""
                    },
                    {
                        name: "Visitor Assistance",
                        description: ""
                    },
                    {
                        name: "Trash Receptacle Maintenance",
                        description: ""
                    },
                    {
                        name: "Graffiti Removal",
                        description: ""
                    },
                    {
                        name: "Winter Snow Tidying",
                        description: ""
                    },
                ]
            },
            {
                type: "2020-2021 Budget:",
                name: "Communications, Outreach and Data",
                budget: 180000,
                description: "The BIZ operates a robust marketing and outreach program geared toward disseminating important information to residents, businesses, visitors and other stakeholders. Additionally it coordinates networking and learning opportunities to businesses, and provides data and analysis on the state of Downtown and surrounding areas.",
                categories: [
                    {
                        name: "BIZ Connect Community Events",
                        description: ""
                    },
                    {
                        name: "Reports and Research",
                        description: ""
                    },
                    {
                        name: "Newsletters and Updates",
                        description: ""
                    },
                    {
                        name: "Data Analysis and Benchmarking",
                        description: ""
                    },
                ]
            },
            {
                type: "2020-2021 Budget:",
                name: "Infrastructre and Planning",
                budget: 70000,
                description: "The BIZ works closely with the City to help coordinate and plan important special projects and infrastructure enhancements.",
                categories: [
                    {
                        name: "Planning for Transformational Downtown Projects",
                        description: ""
                    },
                ]                
            },
            {
                type: "2020-2021 Budget:",
                name: "Safety",
                budget: 300000,
                description: "The BIZ provides for security personnel to patrol Downtown and the Detroit RiverFront. It also coordinates monthly inter-agency safety and security strategy meetings and provides security for special events.",
                categories: [
                    {
                        name: "Park Security Guards",
                        description: ""
                    },
                    {
                        name: "Security Patrols",
                        description: ""
                    },
                    {
                        name: "Regular Coordination Meetings with DPD",
                        description: ""
                    },
                ]                  
            },
        ];


        let config = {
            'x_domain_normalize':1,
            'x_axis_format':"",
            'x_axis_text':"BIZ Assessment by Year",
            'large_pie_title': "Program Budget Categories"
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
