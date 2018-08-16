/* ------------------------------------------- */
/*   Actions for fetching media from API
/*   Described what happened in the UI/App Logic to Redux
/*   Then the reducers decide whether the action should result in a state update
/*   Follow the Flux Standard Action format that wraps the properties inside 'payload' object, as I find it neater
/*   https://github.com/redux-utilities/flux-standard-action
/* ------------------------------------------- */

import { getFlickrFeedQuery } from '../queries/axios-queries';


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

const fetchMediaRequest = (tagId) => ({
  type: FETCH_MEDIA_REQUEST,
  payload: {
    tagId
  }
});

const fetchMediaSuccess = (tagId, items) => ({
  type: FETCH_MEDIA_SUCCESS,
  payload: {
    tagId,
    items
  }
});

const fetchMediaError = (tagId, error) => ({
  type: FETCH_MEDIA_ERROR,
  payload: {
    tagId,
    error
  }
});

/* - Fetch media items 'thunk' asynchronous action made by combining synchronous actions  - */
/* - Thunk Actions replace controllers in functional programming Redux apps - */
/* - Thunk Actions are the place to do all 'impure' business logic such as fetching data and routing - */
const fetchAllMedia = () => (dispatch, getState) => {

  // Fetch relevant media items for each location in the tag list
  const tags = getState().tags;
  tags.allLocations.forEach((tagId) => {

    let searchString = tags.locationsById[tagId].searchQuery;

    // notify reducer fetching has started
    dispatch(fetchMediaRequest (tagId));

    // REST get request
    return getFlickrFeedQuery (searchString)
      .then((response) => {
        console.log('fetchMedia RESPONSE for '+searchString+' ', response);

        // add tag to the result
        let taggedItems = response.map((item) => {
          item.tags = [tagId];
          return item;
        });

        dispatch(fetchMediaSuccess(tagId,taggedItems));

      })
      .catch((error)=> {
        console.log('fetchMedia ERROR for '+searchString, error);
        dispatch(fetchMediaError(tagId, error));
      });
  });  
};



export {
  fetchAllMedia,
  FETCH_MEDIA_REQUEST,
  FETCH_MEDIA_SUCCESS,
  FETCH_MEDIA_ERROR,
};


