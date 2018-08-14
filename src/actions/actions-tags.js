/* ------------------------------------------- */
/*   Actions for the tags
/*   Described what happened in the UI/App Logic to Redux
/*   Then the reducers decide whether the action should result in a state update
/*   No async/API for the tags so only simple synchronous actions
/*   Follow the Flux Standard Action format that wraps the properties inside 'payload' object, as I find it neater
/*   https://github.com/redux-utilities/flux-standard-action
/* ------------------------------------------- */


/* --- Actions Types --- */
// Defining actions types as constants rather than strings make the error picked up earlier if you try to dispatch an action that does not exist
// it throws an undefined constant error immediately instead of dispatching a non existing action through the system that just flows though without triggering any reducer.

const SET_SELECTED_TAG = 'SET_SELECTED_TAG';


/* ------ ACTION CREATORS ------ */

/* - set selected tag synchronous actions - */

const setSelectedTag = (tagId) => ({
  type: SET_SELECTED_TAG,
  payload: {
    tagId
  }
});


export {
  setSelectedTag,
  SET_SELECTED_TAG
};


