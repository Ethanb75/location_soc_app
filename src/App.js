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
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(location => {
        // alert('here: ' + location.coords.latitude + ', ' + location.coords.longitude);
        this.setState({
          isLoading: false
        });
        let crds = location.coords;
        this.setState({crds});
        alert(`${crds.latitude}, ${crds.longitude}`);

        return callback(crds)
      }, err=> {
        alert("error: ", err.message);
      })
    }
  }
  findLocation (crds) {
    let key =  'AIzaSyCFQPdbxrIDRAJqXzWrcLO840z299fr418';
    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=${crds.latitude},${crds.longitude}&key=AIzaSyCFQPdbxrIDRAJqXzWrcLO840z299fr418`).then(function(response) {
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

  askAgain () {
    this.getPermision(
      crds => {
        this.findLocation(crds)
      }
    );
  }

  componentDidMount () {
    this.getPermision(
      crds => {
        this.findLocation(crds)
      }
    );
  }


  showLoadOrNah () {
    let cityList = this.state.cityList;
    // console.log(cityList)
    
    if(this.state.isLoading === true) {
      return (
        <div className="App">
          { () => {
            setTimeout(() => {
              if (!this.state.crds) {
                alert('asking again')
                this.askAgain()
              }
            }, 5000)
          } }
          <div style={{
            display: 'flex',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '40px'

          }}>Loading . . .</div>
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
              <i className="fa fa-user fa-3x" onClick={(el) => el.target.classList.add('active_btn')} aria-hidden="true"></i>
            </div>
            <div className="hamburgerBtn">
              <i className="fa fa-comments fa-3x" onClick={
                  (el) => {
                    this.setState({ inputOpen: !this.state.inputOpen });
                    el.target.classList.add('active_btn')
                  }
              } aria-hidden="true"></i>
            </div>
            <div className="profileBtn">
              <i className="fa fa-globe fa-3x" onClick={(el) => el.target.classList.add('active_btn')} aria-hidden="true"></i>
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
