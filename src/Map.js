import React, { Component } from 'react';
import './App.css';
import Hammer from 'hammerjs';
import L from 'leaflet';


const mapd = document.getElementById('mapid');

// console.log(L)
// var hammertime = new Hammer(mapd);
// hammertime.on('pan', function(ev) {
//   console.log(ev);
// });

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

  let popup = L.popup();

  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("<h2>You clicked the map at " + e.latlng.toString() + "</h2>")
          .openOn(mymap);
  }

  mymap.on('click', onMapClick);
});






class Map extends Component {
  render() {
    return (
      <div id="mapid" className="map">
        
      </div>
    );
  }
}

export default Map;