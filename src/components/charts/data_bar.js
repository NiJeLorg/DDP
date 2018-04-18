import React, {Component} from 'react';
import classNames from 'classnames';
class DataBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            actionLabel: "VIEW DATA"
        };
        this.toggleDataTable= this.toggleDataTable.bind(this);
    }

    toggleDataTable(e) {
        e.preventDefault();
        e.stopPropagation();
        if(!this.state.open){
            this.setState({actionLabel: 'VIEW DATA'});
        }else{
            this.setState({actionLabel: 'HIDE DATA'});
        }
        this.setState({open: !this.state.open});
    }
    render() {
        let openDataTableClasses = classNames({
            'table': true,
            'hidden': this.state.open
        });

        let actionLabel = classNames({
            'active-label':  !this.state.open
        });
        return (
            <div className="c-data">
                <div className="bar">
                    <a href="#" className={actionLabel} onClick={this.toggleDataTable}>{this.state.actionLabel}</a>
                    <div className="vertical-divider"></div>
                    <a href="">DOWNLOAD</a>

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