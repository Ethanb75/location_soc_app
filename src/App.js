import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from './Nav';
import Map from './Map';
// import L from 'leaflet';
import Hammer from 'hammerjs';

let mapBtn = document.getElementById('map');
let profBtn = document.getElementById('prof');
let areaBtn = document.getElementById('area');


class App extends Component {
  //set default state
   state = ({currentView: 'map'})

  //3 views, big area posts, map area posts, profile
  componentDidMount () {
    let mapBtn = document.getElementById('map');
    let profBtn = document.getElementById('prof');
    let areaBtn = document.getElementById('area');

    //TODO:
    //-----------
    //move on click handlers to nav component and use onClick
    mapBtn.onclick = () => {
      this.setState({currentView: 'map'})
    }
    profBtn.onclick = () => {
      this.setState({currentView: 'prof'})
    }
    areaBtn.onclick = () => {
      this.setState({currentView: 'area'})
    }

    //swipe listeners
    // var ham = new Hammer(document.getElementById('mapid'));
    // ham.on('swipe', function(ev) {
    //   console.log('meh!', ev);
    // });
    // ham.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  }

  render () {
    return (
      <div className="App">
        <Map view={this.state.currentView} />
        <Nav view={this.state.currentView}/>
      </div>
    );
  }
}

export default App;
