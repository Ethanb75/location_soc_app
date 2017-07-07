import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from './firebase';

//import components
import Input from './Input';
import Profile from './Profile';
import Nav from './Nav';
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
    )
  }


  showLoadOrNah (loading) {
    let cityList = this.state.cityList;
    // console.log(cityList)
    
    if(loading === true) {
      return (
        <div className="App">
          <div style="display: flex; justify-content: center; align-items: center">Loading . . .</div>
          <Nav />
        </div>
      )
    } else {
      return (
        <div className="App">
          <div className="flex">
            <Input />
            <Profile isOpen={this.state.profileOpen} />
            <Map cityList={cityList} crds={this.state.crds} />
          </div>
          <Nav />
        </div>
        
      )
    }
  }



  render() {
    return this.showLoadOrNah();
  }
}

export default App;
