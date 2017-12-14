import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CircleComponent from './CircleComponent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            <CircleComponent  circleRadius={ 180 }
                              sketchSize={ 26 * 16 } />
        </p>
      </div>
    );
  }
}

export default App;
