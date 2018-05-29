import {combineReducers} from 'redux';
import ActiveSubStoryReducer from './reducer_active_substory';
import ActiveOverlay from './reducer_active_overlay';

const rootReducer = combineReducers({
  activeSubStory: ActiveSubStoryReducer,
  activeOverlay: ActiveOverlay
});

export default rootReducer;
