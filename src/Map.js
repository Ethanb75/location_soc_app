import React, { Component } from 'react';
import './App.css';
import Hammer from 'hammerjs';
import L from 'leaflet';


const mapd = document.getElementById('mapid');

function getMap () {
  let accessToken = 'pk.eyJ1IjoiZXRoYW5iNzUiLCJhIjoiY2o0ZWphbDVwMHhqZDMzczRpc3l1dTNldyJ9.O7z49Byr-cdTCriCytnvtg',
            popup = L.popup(),
            mymap;
    navigator.geolocation.getCurrentPosition(function(position) {
      // do_something(position.coords.latitude, position.coords.longitude);
      let latlang = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 18);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: accessToken
      }).addTo(mymap);
      popup
        .setLatLng(latlang)
        .setContent("<h2>Your at " + latlang.lat + ", " + latlang.lng + "</h2>")
        .openOn(mymap);
        // navigator.geolocation.getCurrentPosition(pos => {
        //   //crd.latitude
        //   let cords = pos.coords;
          // let latlang = {
          //   lat: cords.latitude,
          //   lng: cords.longitude
          // }
          // popup
          //   .setLatLng()
          //   .setContent("<h2>Your at " + latlang.toString() + "</h2>")
          //   .openOn(mymap);
        // }, err => {
        //   console.log(`ERROR ${err.code}: ${err.message}`)
        // });
    

    });
}
// console.log(L)
// var hammertime = new Hammer(mapd);
// hammertime.on('pan', function(ev) {
//   console.log(ev);
// });

//TODO:
//------------------------
//willrecive props from parents
//if have style for map view set on default
//on component update set the style equal to whatever position by chaning style (specifically translate3D)




let style = {transform: 'translate3d(0,0,0)',transition: 'all .3s ease-out'},
  viewRects;


class Map extends Component {

  componentDidMount () {
    viewRects = document.getElementsByClassName('map')[0].getClientRects()[0];
    getMap()
  }
  render() {
    console.log(style)
    switch (this.props.view) {
      case 'map':
        style = {
          transition: 'all .3s ease-out',
          transform: 'translate3d(0,0,0)'
        }
        return (
            <div id="mapid" className="map__view" style={style}>
              Loading...
            </div>
        );
      case 'prof':
        style = {
          transition: 'all .3s ease-out',
          transform: `translate3d(${viewRects.width}px,0,0)`
        }
        return (
            <div id="mapid" className="map__view" style={style}>
              Loading...
            </div>
        );
      case 'area':
        style = {
          transition: 'all .3s ease-out',
          transform: `translate3d(-${viewRects.width}px,0,0)`
        }
        return (
            <div id="mapid" className="map__view" style={style}>
              Loading...
            </div>
        );
    }
  }
}

export default Map;