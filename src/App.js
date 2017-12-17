import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CircleComponent from './CircleComponent'
import BackgroundComponent from './BackgroundComponent'
import PlusComponent from './PlusComponent'
import ContentComponent from "./ContentComponent/index";

class App extends Component {
  render() {
    return (
      <div>
            <div className="shell">
                <header className="header">
                   <nav className="nav">
                       <div className="nav-item">Recherche</div>
                       <div className="nav-item">Carte</div>
                       <div className="nav-item">Lois</div>
                   </nav>
                </header>
                <main className="main">
                    <div className="view home">
                        <ContentComponent/>
                        <PlusComponent/>
                    </div>
                </main>
                <BackgroundComponent />
            </div>
      </div>
    );
  }
}

export default App;
