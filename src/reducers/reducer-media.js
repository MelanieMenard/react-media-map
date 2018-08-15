/* ------------------------------------------- */
/*   Media Reducer
/*   Responsible for the slice of state containing media items retrieved from API
/* ------------------------------------------- */

import {
  FETCH_MEDIA_REQUEST,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_ERROR
} from '../actions/actions-media';


const defaultState = {
  // keep track of which requests are fetching, since mediaItems is a merging of several data sources
  isFetching: {},
  // media items from API
  // in a real app with heavy data crunching on them, it would be best to denormalize the date for efficiency
  // https://redux.js.org/recipes/structuringreducers/normalizingstateshape#normalizing-nested-data
  mediaItems: []
};


const mediaReducer = (state = defaultState, action) => {

  switch (action.type) {


    /* - A fetch request is being sent to the API - */
    case FETCH_MEDIA_REQUEST:

      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.tagId]: true
        }
      };


    /* - A fetch request successfully returned data - */
    case FETCH_MEDIA_SUCCESS:

      // append new items to end of existing array
      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.tagId]: false
        },
        mediaItems: [
          ...state.mediaItems,
          ...action.payload.items
        ]
      };
 

    /* - A fetch request resulted in an error - */
    // the error handling proper happens in the query or thunk action, the reducer only needs to show it's no longer fetching
    case FETCH_MEDIA_ERROR:

      return {
        ...state,
        isFetching: {
          ...state.isFetching,
          [action.payload.tagId]: false
        }
      };


    /* - Any other action do not affect this reducer, return existing state - */
    default:
      return state;
  }
};

export default mediaReducer;