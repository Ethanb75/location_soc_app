import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from './firebase';
import fontAwesome from './css/font-awesome.min.css'

//import components
import Input from './Input';
import Profile from './Profile';
// import Nav from './Nav';
import Map from './Map';

import './App.css';

class App extends Component {
  state = {
    profileOpen: false,
    inputOpen: false,
    isLoading: true,
    initialFBLoad: true,
    city: undefined,
    crds: undefined,
    cityList: undefined
  }
  getPermision (callback) {
    if ('navigator' in window) {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          isLoading: false
        });
      
        let crds = location.coords;
        this.setState({crds});

        return callback(crds)
      })
    }
  }
  findLocation (crds) {
    let key =  'AIzaSyCFQPdbxrIDRAJqXzWrcLO840z299fr418';
    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${crds.latitude},${crds.longitude}&key=AIzaSyCFQPdbxrIDRAJqXzWrcLO840z299fr418`).then(function(response) {
      return response.json();
    }).then(function(json) {
      return json.results[0].address_components[2].long_name;
    }).then(city => {
      this.setState({city});
      firebase.database().ref(`cities/${city}`).on('value', snapshot => {
        //return the snapshot
        let cityList = snapshot.val();
        if (this.state.cityList === undefined) {
          this.setState({cityList});
          //if no city currently will return null not undefined
        } else {
          this.setState({cityList});
                    
        }
      })
    });
  }
  componentDidMount () {
    this.getPermision(
      crds => {
        this.findLocation(crds)
      }
    );
  }


  showLoadOrNah (loading) {
    let cityList = this.state.cityList;
    // console.log(cityList)
    
    if(loading === true) {
      return (
        <div className="App">
          <div style="display: flex; justify-content: center; align-items: center">Loading . . .</div>
          <div className="Nav">
            <div className="mapBtn">
              <i className="fa fa-globe fa-3x" aria-hidden="true"></i>
            </div>
            <div className="hamburgerBtn">
              <i className="fa fa-bars fa-3x" aria-hidden="true"></i>
            </div>
            <div className="profileBtn">
              <i className="fa fa-user fa-3x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      )
    } else {
      const btnStyle = {
          border: 'none',
          display: 'inline',
          position: 'absolute',
          zIndex: '1000',
          right: '8px',
          bottom: '8px',
          background: 'transparent',
          cursor: 'pointer'
        }
      return (
        <div className="App">
          <div className="flex">
            <Input isOpen={this.state.inputOpen} />
            <Profile isOpen={this.state.profileOpen} />
            <Map cityList={cityList} crds={this.state.crds} />
          </div>
          <div className="Nav">
            <div className="mapBtn">
              <i className="fa fa-user fa-3x" aria-hidden="true"></i>
            </div>
            <div className="hamburgerBtn">
              <i className="fa fa-comments fa-3x" onClick={() => this.setState({inputOpen: !this.state.inputOpen})} aria-hidden="true"></i>
            </div>
            <div className="profileBtn">
              <i className="fa fa-globe fa-3x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        
      )
    }
  }



  render() {
    return this.showLoadOrNah();
  }
}

export default App;
