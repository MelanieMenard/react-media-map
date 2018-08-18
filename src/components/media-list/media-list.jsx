import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllMedia } from '../../actions/actions-media';
import './media-list.css';


/* --- Media item presentational component --- */
class Media extends React.Component {
  
  render(){
    const media = this.props.media;

    let inlineStyle = {
      backgroundImage: `url(${media.image})`
    };

    return (
      <li className="media-item">
        <a className="media-link"href={media.image} target="_blank">
          <div className="media-image" style={ inlineStyle }></div> 
          <div className="media-info">
            <p className="media-title">{media.title}</p>
          </div>
        </a>
      </li>
    )
  }
};

// defaultProps prevent crashes if missing data
Media.defaultProps = {
  media: { 
    title: "",
    link: "",
    media: {}
  }
};

Media.propTypes = {
  media: PropTypes.object
};


/* --- Media list presentational component --- */

class MediaList extends React.Component {

  componentDidMount() {
    // fetch the media if not already doing so
    if (!this.props.isFetching) {
      this.props.fetchMedia();
    }
  }
  
  render(){

    // the media list is not nornalised
    // the list parent component can directly pass the whole object to the child item component, which does not need to be connected to Redux via a container
    const mediaItems = this.props.mediaItems;

    let userMessage = '';
    // show spinner if we are fetching and no items yet returned (otherwise show what is there and update as more get fetched)
    const showSpinner = this.props.isFetching && !mediaItems.length;
    const showErrorMessage = this.props.showErrorMessage;
    if (showSpinner) {
      userMessage = '<p>Fetching!</p>';
    }
    else if (showErrorMessage) {
      userMessage = '<p>Error fetching media from server.</p>';
    }
  
    return (
      <div className="media">

        {(showSpinner || showErrorMessage) ? (
          <div className="message" dangerouslySetInnerHTML={{__html: userMessage}}></div>
        ) : (
          <ul className="media-list">
            {mediaItems.map( media => (
              <Media
                key={media.id}
                media={media}
              />
            ))}
          </ul>
        )}

      </div>
    );
  }
};


// defaultProps prevent crashes if missing data
MediaList.defaultProps = {
  mediaItems: []
};

MediaList.propTypes = {
  mediaItems: PropTypes.array
};


/* --- Filtered Media List container component --- */
// https://redux.js.org/basics/usage-with-react#implementing-container-components
// the container component is generated by react-redux
// it feeds the data from the redux store to the presentational component
// you can either apply the container component to a presentational component if all it does is feed data
// or give a different name when it does some meaningful business logic that changes the meaning of the presentational component, for example, filtering the data

const getFilteredMediaItems = (state) => {
  // return matching media if a tag is selected
  if (state.tags.selectedTag) {
    return state.media.mediaItems.filter(media => media.tags.includes(state.tags.selectedTag));
  }
  // otherwise return all media
  else {
    return state.media.mediaItems;
  }
};

// the parent components can still pass props directly to the presentational component, and mapStateToProps can access them as ownProps
// the presentational component does not know whether its props come from the parent (ownProps) or the container, the difference is only visible in mapStateToProps
const mapStateToProps = (state, ownProps) => {
  // requestStatus is an object listing all requests by tag, see if any is still fetching
  let fetchingStatus = Object.values(state.media.requestStatus);
  let isFetching = (fetchingStatus) ? fetchingStatus.includes(true) : false;
  let showErrorMessage = (fetchingStatus) ? fetchingStatus.includes('ERROR') : false;
  return {
    mediaItems: getFilteredMediaItems(state),
    isFetching: isFetching,
    showErrorMessage: showErrorMessage
  };
};

// mapDispatchToProps tells the container component how to dispatch actions to the redux store
const mapDispatchToProps = dispatch => ({
  fetchMedia: () => {
    dispatch( fetchAllMedia());
  }
});

const FilteredMediaList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaList);



export default FilteredMediaList;
