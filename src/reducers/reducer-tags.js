/* ------------------------------------------- */
/*   Tags Reducer
/*   Responsible for the slice of state containing tags
/*   This data is hardcoded (it would come from a custom API in a real app)
/*   So I make it normalised to optimise the state shape
/* ------------------------------------------- */

import { SET_SELECTED_TAG } from '../actions/actions-tags';
import { FETCH_MEDIA_SUCCESS } from '../actions/actions-media';


const defaultState = {

  // whether a tag is selected to filter the media on
  selectedTag: null,

  // lookup object of location tags by Id
  locationsById : {
    "monksHouse" : {
      displayName : "Monks House",
      searchQuery : "Monks House Sussex",
      matchingItems: 0,
    },
    "charleston" : {
      displayName : "Charleston",
      searchQuery : "Charleston House Sussex",
      matchingItems: 0,
    },
    "farleyFarm" : {
      displayName : "Farley Farm",
      searchQuery : "Farley Farm Sussex",
      matchingItems: 0,
    },
    "sissinghurstCastle" : {
      displayName : "Sissinghurst Castle",
      searchQuery : "Sissinghurst Castle",
      matchingItems: 0,
    },
    "knole" : {
      displayName : "Knole",
      searchQuery : "Knole House Kent",
      matchingItems: 0,
    },
    "prospectCottage" : {
      displayName : "Prospect Cottage",
      searchQuery : "Prospect Cottage Dungeness",
      matchingItems: 0,
    },
  },

  // array of all location tag Ids
  allLocations : [
  	"monksHouse", 
  	"charleston",
  	"farleyFarm",
  	"sissinghurstCastle",
  	"knole",
  	"prospectCottage"
  ]
};


const tagsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case SET_SELECTED_TAG:

      // either set the selected tag, and unselect it if user clicked an already selected tag
      return {
        ...state,
        selectedTag: (state.selectedTag !== action.payload.tagId) ? action.payload.tagId : null
      };

    
    /* - A fetch request successfully returned data - */
    case FETCH_MEDIA_SUCCESS:

      // how many matches there are on the server
      return {
        ...state,
        locationsById: {
          ...state.locationsById,
          [action.payload.tagId]: {
            ...state.locationsById[action.payload.tagId],
            matchingItems: parseInt(action.payload.totalItems)
          }
        }
      };


    /* - Any other action do not affect this reducer, return existing state - */
    default:
      return state;
  }
};

export default tagsReducer;