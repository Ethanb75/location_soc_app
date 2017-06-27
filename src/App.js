import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hammer from 'hammerjs';
import Baz from './Baz';
import L from 'leaflet';


const mapd = document.getElementById('mapid');

console.log(L)
var hammertime = new Hammer(mapd);
hammertime.on('pan', function(ev) {
  console.log(ev);
});

let accessToken = 'pk.eyJ1IjoiZXRoYW5iNzUiLCJhIjoiY2o0ZWphbDVwMHhqZDMzczRpc3l1dTNldyJ9.O7z49Byr-cdTCriCytnvtg',
        mymap;
navigator.geolocation.getCurrentPosition(function(position) {
  // do_something(position.coords.latitude, position.coords.longitude);
  mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 18);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: accessToken
  }).addTo(mymap);

});


class App extends Component {
  render() {
    


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Baz />
      </div>
    );
  }
}

export default App;
