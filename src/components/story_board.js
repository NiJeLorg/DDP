import React, {Component} from 'react';
import Navigation from './navigation';
import StoryHeader from './story_header';
import Stories from './stories';
import Footer from './footer';
import CHAPTERS from './../utils/content';
import { setActiveOverlay } from "../actions/index";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import _ from'lodash';


class StoryBoard extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.state = {
      chapter: CHAPTERS[params.id]
    };
    this.props.setActiveOverlay(CHAPTERS[params.id]['defaultOverlay']);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = nextProps;
    this.setState({chapter: CHAPTERS[params.id]});
    this.props.setActiveOverlay(CHAPTERS[params.id]['defaultOverlay']);
  }

  handleScroll(){
    console.log("hello");
    this.setCurrentSection()
  }

  setCurrentSection() {
    console.log("hello");
  }

  render() {
    let handleScroll = "";
    console.log(this.state.chapter);
    if (this.state.chapter === 3) {
      handleScroll = _.debounce(() => {this.handleScroll()}, 1000);
    }
    return (
      <div className="c-story-board" onScroll={handleScroll}>
        <Navigation />
        <StoryHeader chapter={this.state.chapter} />
        <Stories chapter={this.state.chapter}/>
        <Footer />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveOverlay: setActiveOverlay }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryBoard);