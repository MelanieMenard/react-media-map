import React, { Component } from 'react';
import logo from './logo.svg';
import './style/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Media Map Prototype</h1>
        </header>
        <div className="app-content">
        </div>
      </div>
    );
  }
}

export default App;