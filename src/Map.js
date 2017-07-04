import React, { Component } from 'react';
import './App.css';
import Hammer from 'hammerjs';
import L from 'leaflet';
import firebase from './firebase';
import geolib from 'geolib';

let mymap,
    userCrds,
    areaPosts;

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

//testing variables
// function getPostsAndUpdateMap () {
//   let promise = new Promise((resolve, reject) => {
//     firebase.database().ref('posts').once('value', snapshot => {
//       //return the snapshot
//       console.log(snapshot.val().length);
//       resolve(snapshot.val());
//     })
//   })
//   return promise;
// };



function newPost (snapValue) {
  if (areaPosts) {
    snapValue.get
  } else {
    snapValue.forEach((el, index) => {
      if (index != 0) {
        let popup = L.popup({autoClose: false});
        popup.setLatLng([el.location.latitude, el.location.longitude])
            .setContent(() => {
              let content = document.createElement('div');
              content.innerHTML = `
                <div>
                  <p>${el.message}</p>
                  <p><small>by ${el.username}</small></p>
                </div>
              `;
              return content
            })
            .openOn(mymap);
      }
    })
  }
}


function getMapAndUpdate (callback) {
  let accessToken = 'pk.eyJ1IjoiZXRoYW5iNzUiLCJhIjoiY2o0ZWphbDVwMHhqZDMzczRpc3l1dTNldyJ9.O7z49Byr-cdTCriCytnvtg';
     
     //make a map with the access token and return callback
     mymap = L.map('mapid').setView([0, 0], 3);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: accessToken
      }).addTo(mymap);

      return callback();
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
    viewRects;


class Map extends Component {
  // state for input screen
  state = {inputOut: false}

  componentDidMount () {
    viewRects = document.getElementsByClassName('map')[0].getClientRects()[0];
    
    getMapAndUpdate(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          let crds = position.coords;
          let range = [
              {latitude: crds.latitude + .2, longitude: crds.longitude + .2},
              {latitude: crds.latitude + .2, longitude: crds.longitude + -.2},
              {latitude: crds.latitude + -.2, longitude: crds.longitude + -.2},
              {latitude: crds.latitude + -.2, longitude: crds.longitude+ .2}
          ];
          let rangeArr = [
              [crds.latitude + .2, crds.longitude + .2],
              [crds.latitude + .2, crds.longitude + -.2],
              [crds.latitude + -.2, crds.longitude + -.2],
              [crds.latitude + -.2, crds.longitude + .2],
              [crds.latitude + .2, crds.longitude + .2]
            ]
          // let boxPolly = L.polyline(rangeArr, {color: 'whitesmoke', fill: 'blue'}).addTo(mymap);
          // zoom the map to the polyline
          let bounds = [[crds.latitude - .25, crds.longitude - .25], [crds.latitude + .25, crds.longitude + .25]];
          // create an orange rectangle
          L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(mymap);
          // zoom the map to the rectangle bounds
          let latlng = L.latLng(crds.latitude, crds.longitude);
          mymap.flyTo(latlng, 10/*, options*/);

          
          console.log('Inside Geobox \n', geolib.isPointInside({latitude: crds.latitude, longitude: crds.longitude}, range));
          firebase.database().ref('posts').on('value', snapshot => {
            //return the snapshot
            let val = snapshot.val();
            newPost(val)
          })
        });
      } else {
        firebase.database().ref('posts').on('value', snapshot => {
          //return the snapshot
          let val = snapshot.val();
          newPost(val)
        })
      }
      
    });
    
  }
  postMsg (val) {

  }
  
  render() {
    console.log(this.state)
    switch (this.props.view) {
      case 'map':
        style = {
          transition: 'all .3s ease-out',
          transform: 'translate3d(0,0,0)'
        }
        return (
          <div className="map">
            <div className="wrap">
              <div id="mapid" className="map__view" style={style}>
                Loading...
              </div>
              <button className="map__new">Click me!</button>
            </div>
          </div>
        );
      case 'prof':
        style = {
          transition: 'all .3s ease-out',
          transform: `translate3d(${viewRects.width}px,0,0)`
        }
        return (
          <div className="map">
            <div className="wrap">
              <div id="mapid" className="map__view" style={style}>
                Loading...
              </div>
              <button className="map__new">Click me!</button>
            </div>
          </div>
        );
      case 'area':
        style = {
          transition: 'all .3s ease-out',
          transform: `translate3d(-${viewRects.width}px,0,0)`
        }
        return (
          <div className="map">
            <div className="wrap">
              <div id="mapid" className="map__view" style={style}>
                Loading...
              </div>
              <button className="map__new">Click me!</button>
            </div>
          </div> 
        );
    }
  }
}

export default Map;