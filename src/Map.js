import React, { Component } from 'react';
// import './App.css'

//3rd party
import L from 'leaflet';
import firebase from './firebase';


export default class Map extends Component {
  state = {
    mapUp: false,

  }
  renderMap (crds, callback) {
    if (this.state.mapUp === false) {
      let accessToken = 'pk.eyJ1IjoiZXRoYW5iNzUiLCJhIjoiY2o0ZWphbDVwMHhqZDMzczRpc3l1dTNldyJ9.O7z49Byr-cdTCriCytnvtg';

      // console.log(mapd)
      let mymap = L.map('mapid', {closePopupOnClick: false}).setView([crds.latitude, crds.longitude], 9);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 14,
            id: 'mapbox.streets',
            accessToken
        }).addTo(mymap);

        this.setState({mapUp: true})

        return callback(mymap);
    }
  }
  renderPosts (uidList, mymap) {
    uidList.forEach((el, i) => {
      firebase.database().ref(`posts/${el}`).on('value', snapshot => {
        let post = snapshot.val();
        let marker = L.marker([post.location.latitude, post.location.longitude]).addTo(mymap);
        
        //bind the popup with the post
        marker.bindPopup(`<p>${post.message}</p>`)
      })
    });
  }
  
  componentDidUpdate(prevProps, prevState) {
    //if cityList and crds are both populated then render the map and posts
    if (this.props.crds !== undefined) {
      let crds = this.props.crds;
      if (this.props.cityList !== undefined) {
        let uidList = this.props.cityList
        //bind our this to that
        let that = this;
        
        this.renderMap(crds, function (mymap) {
          that.renderPosts(uidList, mymap)
        })
      }
    }
  }
  // componentDidMount () {
  //   console.log(this.props.crds)
  //   this.renderMap(mymap => {
  //     console.log(mymap)
  //   });
  // }
  render () {
    return (
    <div className="mapWrap">
      <div id="mapid" className="Map" style={{height: '100%'}}>
      </div>
    </div>
    )
  }
}