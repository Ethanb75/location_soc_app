import React, { Component } from 'react';
// import './App.css'

//3rd party
import L from 'leaflet';
import firebase from './firebase';


export default class Map extends Component {
  state = {
    mymap: undefined
  }
  renderMap (callback) {
    let accessToken = 'pk.eyJ1IjoiZXRoYW5iNzUiLCJhIjoiY2o0ZWphbDVwMHhqZDMzczRpc3l1dTNldyJ9.O7z49Byr-cdTCriCytnvtg';

    // console.log(mapd)
    let mymap = L.map('mapid', {closePopupOnClick: false}).setView([0, 0], 5);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 14,
          id: 'mapbox.streets',
          accessToken
      }).addTo(mymap);

      this.setState({mymap})

      return callback(mymap);
  }
  renderPosts (uidList) {
    uidList.forEach(function(element) {
      console.log(element);
    });
  }
  
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.crds)
  //   // if (nextProps.crds !== undefined) {
  //   //   this.renderMap(this.props.crds, function () {
  //   //     console.log('about to mount');
  //   //   })
  //   // }
  // }
  componentDidMount () {
    console.log(this.props.crds)
    this.renderMap(mymap => {
      console.log(mymap)
    });
  }
  render () {
    return (
    <div className="mapWrap">
      <div id="mapid" className="Map" style={{height: '100%'}}>
      </div>
    </div>
    )
  }
}