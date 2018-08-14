import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './style/app.css';
import store from './store/store';
import TagCloud from './components/tag-cloud.jsx';
import FilteredMediaList from './components/media-list.jsx';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React Media Map Prototype</h1>
          </header>
          <div className="app-content">
            <TagCloud/>
            <FilteredMediaList/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
