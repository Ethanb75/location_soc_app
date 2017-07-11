import React, { Component } from 'react';

export default class Input extends Component {
  style__out = {
    zIndex: '1000',
    background: 'wheat',
    transform: 'translateY(0)',
    transition: 'all .5s ease-out',
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
          <label htmlFor="message" className="inputLabel">What's up?</label>
          <textarea name="message" id="" style={{
            display: 'block',
            padding: '1rem',
            width: '100%',
            height: '85%',
            border: 'none',
            boxSizing: 'border-box',
            resize: 'none',
            transition: 'all 1s ease',
            opacity: '1'
          }} placeholder="I'm having a blast doing..."></textarea>
          <div className="InputBtns">
            <button>Send Message</button>
            <button>Cancel</button>
          </div>
        </div>
      )
    } else {
      return (
        <div id="input" className="Input" style={this.style__hide}>
          <label htmlFor="message" className="inputLabel">What's up?</label>
          <textarea name="message" id="" style={{
            display: 'block',
            padding: '1rem',
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            border: 'none',
            resize: 'none',
            transition: 'all 1s ease',
            opacity: '0'
          }} placeholder="I'm having a blast doing..."></textarea>
          <div className="InputBtns">
            <button>Send Message</button>
            <button>Cancel</button>
          </div>
        </div>
      )
    }
  }
}
