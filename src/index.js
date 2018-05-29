import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Navigation from './components/navigation';
// import Stories from './components/stories';
import Home from "./components/home";
import Chapters from "./components/chapters";
import StoryBoard from "./components/story_board";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';


import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
const createStoreWithMiddleware = applyMiddleware()(createStore);
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chapters" component={Chapters} />
        <Route path="/story/:id" component={StoryBoard} />
      </Switch>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
    </Provider>
  </BrowserRouter>,
  document.querySelector(".app")
);
