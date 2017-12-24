import React, { Component}  from 'react';
import {Link} from 'react-router-dom';
import './layout.scss';

class NavigationComponent extends Component {
    render() {
        return (
            <header className="header">
                <nav className="nav">
                    <Link className="nav-item" to="/search">Recherche</Link>
                    <Link className="nav-item" to="/map">Carte</Link>
                    <Link className="nav-item" to="/law">Lois</Link>
                </nav>
            </header>
        );
    }
}

export default NavigationComponent;

