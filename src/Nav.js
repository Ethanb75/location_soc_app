import React, { Component } from 'react';
import Map from './Map';

function renderNav(curr) {
  //get the old element by class name active and the new by the id
  let oldEl = document.getElementsByClassName('active')[0];
  let newEl = document.getElementById(curr.view);

  //toggle active class on both
  newEl.classList.toggle('active');
  oldEl.classList.toggle('active');

}

class Nav extends Component {
  // componentDidUpdate(object prevProps, object prevState)
  componentWillReceiveProps(nextProps) {
    //run rerender with current state
    renderNav(nextProps);
  }s

  render() {
    return (
      <div className="nav">
        <div id="prof" className="nav__profile">Profile</div>
        <div id="map" className="nav__map active" active>Map</div>
        <div id="area" className="nav__area">Area</div>
      </div>
    );
  }
}

export default Nav;