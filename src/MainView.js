import React, { Component } from 'react';
import Map from './Map';

class MainView extends Component {
  
  render () {
    //check what the view state is and do something
    const viewChecker = (view) => {
     switch (view) {
       case 'map':
        return (
          <Map />
        )
       case 'area':
        return (
          <div>Area</div>
        )
     }
    }
    return (
      <div className="map">
        {viewChecker(this.props.view)}
      </div>
    )
  }
};

export default MainView;