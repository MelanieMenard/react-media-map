import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './style/app.css';
import store from './store/store';
import TagCloud from './components/tag-cloud/tag-cloud.jsx';
import FilteredMediaList from './components/media-list/media-list.jsx';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <header className="app-header">
            <h1 className="app-title">Artists' Homes</h1>
          </header>
          <div className="app-content">
            <div className="app-sidebar">
              <TagCloud/>
            </div>
            <div className="app-main-content">
              <FilteredMediaList/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
