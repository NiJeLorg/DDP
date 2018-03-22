import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/navigation';
import Stories from './components/stories';
import ReactDrawer from 'react-drawer';
// import 'react-drawer/lib/react-drawer.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.state = {
            isOpen: false,
            position: 'left',
            noOverlay: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeDrawer() {
        this.setState({isOpen: false});
    }
    onDrawerClose() {
        this.setState({isOpen: false});
    }

    render() {

        return (
            <div>
                <Navigation/>
                <Stories />
            </div>

        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.app'));