import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import HomeComponent from '../components/HomeComponent'
import SearchComponent from '../components/SearchComponent'

class Full extends Component {
    render() {
        return (
            <div className="app">
                <div className="app-body">
                    <main className="main">
                        <HashRouter>
                            <Switch>
                                <Route path="/home" name="AdminList" component={HomeComponent}/>
                                <Route path="/search" name="SearchList" component={SearchComponent}/>
                            </Switch>
                        </HashRouter>
                    </main>
                </div>
            </div>
        );
    }
}

export default Full;
