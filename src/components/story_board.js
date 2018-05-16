import React, {Component} from 'react';
import Navigation from './navigation';
import StoryHeader from './story_header';
import Stories from './stories';
import CHAPTERS from './../utils/content';
class StoryBoard extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      chapter: CHAPTERS[params.id]
    }
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

export default StoryBoard;