import React, { Component } from 'react';
import './App.css';
import Hammer from 'hammerjs';
import L from 'leaflet';
import firebase from './firebase';

//for user, set the user info in the database, but also set the id information for firebase users
// function dataUp(username, email) {
//   console.log(firebase.database().ref());
//   firebase.database().ref('users/' + username).set({
//     // profile_picture : imageUrl,
//     username,
//     email
//   });
// };
// dataUp('billy', 'wow@gmail.com')

//location will be stored as an object with latitude + longitude as keys
// function fakePost (message, username, location) {
//     firebase.database().ref('posts/' + '1').set({
//     // profile_picture : imageUrl,
//     username,
//     message,
//     location
//   });
// }
// fakePost('wow this is a cool place', 'billy', {latitude: 34, longitude: -84});


// var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
// });

//use a callback or promise to update everyting after
firebase.database().ref('posts').on('value', snapshot => {
  console.log(snapshot.val()[1]);
})






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
    });
}

//TODO:
//------------------------
//willrecive props from parents
//if have style for map view set on default
//on component update set the style equal to whatever position by chaning style (specifically translate3D)
//
// REMEMBER: can also use mymap.on('click', callback) 
// no hammerjs b/c the click is recognized




let style = {color: 'blue'},
    style2 = {transition: 'all 0.3s ease-out 0s', transform: 'translate3d(815.333px, 0px, 0px)'},
  viewRects;


class Map extends Component {

  componentDidMount () {
    viewRects = document.getElementsByClassName('map')[0].getClientRects()[0];
    getMap()

  }
  render() {
    switch (this.props.view) {
      case 'map':
        style = {
          transition: 'all .3s ease-out',
          transform: 'translate3d(0,0,0)'
        }
        return (
            <div className="wrap">
              <div id="mapid" className="map__view" style={style}>
                Loading...
              </div>
              <button className="map__new">Click me!</button>
            </div>
        );
      case 'prof':
        style = {
          transition: 'all .3s ease-out',
          transform: `translate3d(${viewRects.width}px,0,0)`
        }
        return (
            <div className="wrap">
              <div id="mapid" className="map__view" style={style}>
                Loading...
              </div>
              <button className="map__new">Click me!</button>
            </div>
        );
      case 'area':
        style = {
          transition: 'all .3s ease-out',
          transform: `translate3d(-${viewRects.width}px,0,0)`
        }
        return (
          <div className="wrap">
            <div id="mapid" className="map__view" style={style}>
              Loading...
            </div>
            <button className="map__new">Click me!</button>
          </div>
        );
    }
  }
}

export default Map;