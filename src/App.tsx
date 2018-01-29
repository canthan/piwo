import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import ReactSVG from 'react-svg';
// import { Component } from 'react';
import { Storage } from './components/storage/storage';
// import Logo from './assets/img/logo.svg';
import './App.css';

// const logo = require('svg-inline-loader?classPrefix!./assets/img/logo.svg');

export default class App extends React.Component<{}, {}> {
    
    constructor(props){
        super(props)
        this.state = {
            loaded: true
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <ReactSVG path="./assets/img/logo.svg"/> */}
                    {/* <img src='svg-inline-loader?classPrefix!./assets/img/logo.svg' className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Storage app</h1>
                </header>
                <Storage />
            </div>
        );
    }
}

// export default App;
