/* ------------------------------------------- */
/*   Tags Reducer
/*   Responsible for the slice of state containing tags
/*   This data is hardcoded (it would come from a custom API in a real app)
/*   So I make it normalised to optimise the state shape
/* ------------------------------------------- */


const defaultState = {

  // whether a tag is selected to filter the media on
  selectedTag: null,

  // lookup object of location tags by Id
  locationsById : {
    "monksHouse" : {
      displayName : "Monks House",
      searchQuery : "Monks House Sussex",
    },
    "charleston" : {
      displayName : "Charleston",
      searchQuery : "Charleston Sussex",
    },
    "farleyFarm" : {
      displayName : "Farley Farm",
      searchQuery : "Farley Farm Sussex",
    },
    "sissinghurstCastle" : {
      displayName : "Sissinghurst Castle",
      searchQuery : "Sissinghurst Castle",
    },
    "knole" : {
      displayName : "Knole",
      searchQuery : "Knole House Kent",
    },
    "prospectCottage" : {
      displayName : "Prospect Cottage",
      searchQuery : "Prospect Cottage Dungeness",
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


    /* - Any other action do not affect this reducer, return existing state - */
    default:
      return state;
  }
};

export default tagsReducer;