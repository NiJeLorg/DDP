import React, {Component} from 'react';
import Stories from './stories';
import CHAPTERS from '../utils/content';
import { setActiveOverlay } from "../actions/index";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';


class StoryBoardNoHeader extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    CHAPTERS[params.id]['showdatadrawer'] = false;

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

export default connect(mapStateToProps, mapDispatchToProps)(StoryBoardNoHeader);