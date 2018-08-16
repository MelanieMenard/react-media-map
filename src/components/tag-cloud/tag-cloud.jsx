import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSelectedTag } from '../../actions/actions-tags';
import './tag-cloud.css';


/* --- Tag item presentational component --- */
class Tag extends React.Component {
  
  constructor(props){
    super(props);
    this.onTagClicked = this.onTagClicked.bind(this);
  }

  onTagClicked(e){
    e.preventDefault();
    this.props.setSelectedTag(this.props.tagId);
  }

  render(){
    const tagId = this.props.tagId;
    const tag = this.props.tag;
    const isSelected = this.props.isSelected;

    return (
       <li className={"tag-item" + (isSelected ? " selected" : "")}>
          <a
            className="tag"
            onClick={(e) => {this.onTagClicked(e, tagId)}}
            >
              <p className="tag-title">
                {tag.displayName}
              </p>     
          </a>
        </li>
    )
  }
};

// defaultProps prevent crashes if missing data
Tag.defaultProps = {
  tag: { displayName: ""}
};

Tag.propTypes = {
  tag: PropTypes.object
};


/* --- Tag item container component --- */

// because we have normalised data with lookup object byId, we need more container components
// as each tag needs to find its full object, the parent only being able to pass the id down from the array
const mapStateToPropsTag = (state, ownProps) => {
  return {
    tag: state.tags.locationsById[ownProps.tagId],
    isSelected: (ownProps.tagId === state.tags.selectedTag)
  };
};

const mapDispatchToPropsTag = dispatch => ({
  // Set selected tag
  setSelectedTag: (tagId) => {
    dispatch( setSelectedTag(tagId));
  }
});

// mapDispatchToProps tells the container component how to dispatch actions to the redux store
// TagCloud does not dispatch any action so mapDispatchToProps is null 

Tag = connect(
  mapStateToPropsTag,
  mapDispatchToPropsTag
)(Tag);


/* --- Tag cloud presentational component --- */

class TagCloud extends React.Component {
  
  render(){

    const tags = this.props.tags;

    return (
      <div className="tag-cloud">
          <ul className="tag-list">
            {tags.map( tag => (
              <Tag
                key={tag}
                tagId={tag}
              />
            ))}
          </ul> 
      </div>
    );
  }
};


// defaultProps prevent crashes if missing data
TagCloud.defaultProps = {
  tags: []
};

TagCloud.propTypes = {
  tags: PropTypes.array
};


/* --- Tag cloud container component --- */
// https://redux.js.org/basics/usage-with-react#implementing-container-components
// the container component is generated by react-redux
// it feeds the data from the redux store to the presentational component
// you can either apply the container component to a presentational component if all it does is feed data
// or give a different name when it does some meaningful business logic that changes the meaning of the presentational component, for example, filtering the data

// the parent components can still pass props directly to the presentational component, and mapStateToProps can access them as ownProps
// the presentational component does not know whether its props come from the parent (ownProps) or the container, the difference is only visible in mapStateToProps
const mapStateToPropsTagCloud = (state, ownProps) => {
  return {
    tags: state.tags.allLocations
  };
};

// mapDispatchToProps tells the container component how to dispatch actions to the redux store
// TagCloud does not dispatch any action so mapDispatchToProps is null 

TagCloud = connect(
  mapStateToPropsTagCloud,
  null
)(TagCloud);



export default TagCloud;
