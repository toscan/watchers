import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import Full from './containers/Full';
import './App.css';

class App extends Component {
  render() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" name="Home" component={Full}/>
            </Switch>
        </HashRouter>

    );
  }
}

export default App;
