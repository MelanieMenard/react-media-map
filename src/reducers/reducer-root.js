/* ------------------------------------------- */
/*   Redux Root Reducer
/*   The Root reducer combines the different reducers responsible for updating specific bits of data in the state
/* ------------------------------------------- */

import { combineReducers } from 'redux';
import tagsReducer from '../reducers/reducer-tags';
import mediaReducer from '../reducers/reducer-media';

const rootReducer = combineReducers({
  tags: tagsReducer,
  media: mediaReducer
});

export default rootReducer;