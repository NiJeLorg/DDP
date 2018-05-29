import React, {Component} from 'react';
import Navigation from './navigation';
import StoryHeader from './story_header';
import Stories from './stories';
import CHAPTERS from './../utils/content';
import { setActiveOverlay } from "../actions/index";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';


class StoryBoard extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.state = {
      chapter: CHAPTERS[params.id]
    };
    this.props.setActiveOverlay(CHAPTERS[params.id]['defaultOverlay']);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = nextProps;
    this.setState({chapter: CHAPTERS[params.id]});
    this.props.setActiveOverlay(CHAPTERS[params.id]['defaultOverlay']);
  }

  render() {
    return (
      <div className="c-story-board">
        <Navigation />
        <StoryHeader chapter={this.state.chapter} />
        <Stories chapter={this.state.chapter}/>
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