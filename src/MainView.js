import React, { Component } from 'react';
import Map from './Map';
//this class may be useless?
class MainView extends Component {
  render () {
    return (
      <div className="map">
        <Map view={this.props.view}/>
      </div>
    )
  }
};

export default MainView;