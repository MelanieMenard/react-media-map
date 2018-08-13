/* ------------------------------------------- */
/*   Actions for fetching media from API
/*   Described what happened in the UI/App Logic to Redux
/*   Then the reducers decide whether the action should result in a state update
/*   Follow the Flux Standard Action format that wraps the properties inside 'payload' object, as I find it neater
/*   https://github.com/redux-utilities/flux-standard-action
/* ------------------------------------------- */

import { getRESTQuery } from '../queries/axios-queries';


/* --- Actions Types --- */
// Defining actions types as constants rather than strings make the error picked up earlier if you try to dispatch an action that does not exist
// it throws an undefined constant error immediately instead of dispatching a non existing action through the system that just flows though without triggering any reducer.

// Fetch media items from API
const FETCH_MEDIA_REQUEST = 'FETCH_MEDIA_REQUEST';
const FETCH_MEDIA_SUCCESS = 'FETCH_MEDIA_SUCCESS';
const FETCH_MEDIA_ERROR = 'FETCH_MEDIA_ERROR';


/* ------ ACTION CREATORS ------ */

/* --- Fetch media items ACTIONS --- */

/* - Fetch media items synchronous actions - */

const fetchMediaRequest = (searchString) => ({
  type: FETCH_MEDIA_REQUEST,
  payload: {
    searchString
  }
});

const fetchMediaSuccess = (data) => ({
  type: FETCH_MEDIA_SUCCESS,
  payload: {
    data
  }
});

const fetchMediaError = (error) => ({
  type: FETCH_MEDIA_ERROR,
  payload: {
    error
  }
});

/* - Fetch media items 'thunk' asynchronous action made by combining synchronous actions  - */
/* - Thunk Actions replace controllers in functional programming Redux apps - */
/* - Thunk Actions are the place to do all 'impure' business logic such as fetching data and routing - */
const fetchMedia = (searchString) => (dispatch, getState) => {

  // notify reducer fetching has started
  dispatch(fetchMediaRequest (searchString));

  // endpoint to get it to compile only, query not formatted properly
  let flickrBaseUrl = 'http://www.flickr.com/services/feeds/photos_public.gne';

  // REST get request
  return getRESTQuery (flickrBaseUrl, searchString)
    .then(response => {

      console.log('fetchMedia RESPONSE', response);
      dispatch(fetchMediaSuccess(response));

    })
    .catch((error)=> {
      console.log('fetchMedia ERROR', error);
      dispatch(fetchMediaError(error));
    })
};



export {
  fetchMedia,
  FETCH_MEDIA_REQUEST,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_ERROR,
};


