import React, { Component } from 'react';

import BackgroundComponent from '../BackgroundComponent'
import PlusComponent from '../PlusComponent'
import ContentComponent from "../ContentComponent";
import NavigationComponent from "../NavigationComponent";

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <div className="shell">
                    <NavigationComponent/>
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

export default HomeComponent;

