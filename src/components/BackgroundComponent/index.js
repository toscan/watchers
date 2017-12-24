import React from 'react'
import './layout.css'

class BackgroundComponent extends React.Component {
    render() {
        return <span>
                <div className="overlay">
                </div>
                <div className="lines">
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                    <div className="line"/>
                </div>
            </span>
            }
}

export default BackgroundComponent;