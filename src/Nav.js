import React, { Component } from 'react';
import Map from './Map';


class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__profile">Profile</div>
        <div className="nav__map">Map</div>
        <div className="nav__area">Area</div>
      </div>
    );
  }
}

export default Nav;