import React, {Component} from "react";
import StoryOne from "./stories/story_one";
import StoryTwo from "./stories/story_two";
import StoryThree from "./stories/story_three";
import _ from'lodash';
import { setActiveOverlay } from "../actions/index";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class StoryNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: this.props.chapter,
    };
    this.handleScroll = this.handleScroll.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({chapter: nextProps.chapter})

  }


  handleScroll(){
    this.setCurrentSection()
  }

  setCurrentSection() {
    const parent = document.getElementsByClassName('c-story-navigator')[0];
    const elements = document.getElementsByClassName('sub-sub-heading__purple');
    let els = [];
    let currentActiveElement = '';
    for (let el of elements) {
      els.push(el.offsetTop);
    }
    let closest = Math.min.apply(null, els);
    for(var i = 0; i < els.length; i++){
      if(els[i] <= parent.scrollTop && els[i] > closest) {
        closest = els[i];
      }
    }
    for (let el of elements) {
      console.log(el.offsetTop, closest);

      if (el.offsetTop == closest) {
        currentActiveElement = el;
        this.props.setActiveOverlay(el.dataset.storyOverlay);
        break;
      }
    }  
    
    console.log(this.state.chapter.id);
  
    // for (let el of elements) {
    //   console.log(el.dataset.storyId, el.offsetTop, el.scrollTop, parent.scrollTop);
    //   if (Math.abs(parent.scrollTop - el.offsetTop) <= 60){
    //     currentActiveElement = el;
    //     this.props.setActiveOverlay(el.dataset.storyOverlay);
    //     break;
    //   }
    // }
    
  }


  render() {
    let story = "";
    let story_navigator_class = "";
    let handleScroll = "";
    if (this.state.chapter.id === 1) {
      story = <StoryOne/>;
      story_navigator_class = "c-story-navigator";
      handleScroll = _.debounce(() => {this.handleScroll()}, 1000);
    } else if (this.state.chapter.id === 2) {
      story = <StoryTwo/>;
      story_navigator_class = "c-story-navigator";
      handleScroll = _.debounce(() => {this.handleScroll()}, 1000);
    } else if (this.state.chapter.id === 3) {
      story = <StoryThree/>;
      story_navigator_class = "c-story-navigator__value_of_the_biz";
      handleScroll = _.debounce(() => {this.handleScroll()}, 1000);
      console.log(handleScroll);
    }

    return (
      <div className={story_navigator_class} onScroll={handleScroll}>
        {story}
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

export default connect(mapStateToProps, mapDispatchToProps)(StoryNavigator);
