import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from './Nav';
import Map from './Map';
import MainView from './MainView';
// import L from 'leaflet';
// import Hammer from 'hammerjs';


class App extends Component {
  //3 views, big area posts, map area posts, profile
  state = {currentView: 'map'};


  render() {

    return (
      <div className="App">
        <MainView view={this.state.currentView} />
        <Nav />
      </div>
    );
  }
}

export default App;
