import React, { Component } from 'react';

export default class Input extends Component {
  style__out = {
    zIndex: '1000',
    background: 'wheat',
    transform: 'translateY(0)',
    transition: 'all .5s ease-out'
  }
  style__hide = {
    zIndex: '1000',
    background: 'wheat',
    transform: 'translateY(-100%)',
    transition: 'all .5s ease-out'
  }

  render () {
    if (this.props.isOpen === true) {
      return (
        <div id="input" className="Input" style={this.style__out}>
          Input
        </div>
      )
    } else {
      return (
        <div id="input" className="Input" style={this.style__hide}>
          Input
        </div>
      )
    }
  }
}
