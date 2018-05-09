import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import Navigation from './components/navigation';
// import Stories from './components/stories';
import Home from './components/home';
import Chapters from './components/chapters';
import StoryBoard from './components/story_board';
import { BrowserRouter, HashRouter,
    Switch,
    Route,
    Link } from 'react-router-dom'


class App extends Component {
    constructor(props) {
        super(props);
    }



    render() {

        return (
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/chapters' component={Chapters}/>
                    <Route path='/story' component={StoryBoard}/>
                </Switch>

        );
    }
}

ReactDOM.render( <BrowserRouter>
    <App />
</BrowserRouter>, document.querySelector('.app'));