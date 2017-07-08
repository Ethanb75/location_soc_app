import React, { Component } from 'react';

export default class Nav extends Component {
  render () {
    return (
    <div className="Nav">
      <div className="profileBtn">
        <i className="fa fa-user fa-3x" aria-hidden="true"></i>
      </div>
      <div className="mapBtn">
        <i className="fa fa-globe fa-3x" aria-hidden="true"></i>
      </div>
    </div>
    )
  }
}