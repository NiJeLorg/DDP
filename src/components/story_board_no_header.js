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

  componentDidMount(){
    window.addEventListener('load', function () {
      if (window.self === window.top) return; // We're not in an iframe

      const sendFrameHeight = function () {
        const height = document.getElementById('container').clientHeight + 28;
        window.parent.postMessage({ height: height }, '*');
      };

      sendFrameHeight();  // Initially notify the embedding page what the height should be

      window.addEventListener('resize', sendFrameHeight);  // Notify the embedding page any time we are resized

      const observer = new MutationObserver(sendFrameHeight);
      const config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      };
      observer.observe(window.document, config);
    });
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