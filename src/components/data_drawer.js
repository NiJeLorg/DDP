import React, {Component} from 'react';
import ReactDrawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';
import classNames from 'classnames';

class DataDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            position: 'left',
            noOverlay: true
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setNoOverlay = this.setNoOverlay.bind(this);
    }

    setPosition(e) {
        this.setState({position: e.target.value});
    }

    setNoOverlay(e) {
        this.setState({noOverlay: e.target.checked});
    }

    toggleDrawer() {
        this.setState({open: !this.state.open});
    }

    closeDrawer() {
        this.setState({open: false});
    }

    onDrawerClose() {
        this.setState({open: false});
    }

    render() {
        let openDrawerBtnClasses = classNames({
            'btn-drawer-open': true,
            // 'hidden': this.state.open
        });
        return (
            <div className="c-drawer">
                <div className={openDrawerBtnClasses}>
                    <a onClick={this.toggleDrawer}
                       disabled={this.state.open && !this.state.noOverlay}>
                        DATA DRAWER
                    </a>

                </div>
            </div>
        );

    }

}

export default DataDrawer;