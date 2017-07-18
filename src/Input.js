import React, { Component } from 'react';
import uuid from 'uuid/v1';
import firebase from './firebase';


export default class Input extends Component {
  state = {
    uuid: uuid()
  }
  sumbitMessage (e) {
    e.preventDefault();

    //get value and set textbox to empty
    let message = e.target.children[1].value;
    e.target.children[1].value = '';
    
    let latitude = this.props.crds.latitude;
    let longitude = this.props.crds.longitude;
    
    firebase.database().ref('posts/' + this.state.uuid).set({
      likes: 0,
      location: {
        latitude,
        longitude
      },
      message,
      username: 'bobby'
    }).then(() => {

        firebase.database().ref(`cities/${this.props.city}/${this.props.cityList.length}`).set(this.state.uuid)
    });

  }
  
  style__out = {
    zIndex: '10000',
    background: '#5B7789',
    transform: 'translateY(0)',
    transition: 'all .5s ease-out',
  }
  style__hide = {
    zIndex: '10000',
    background: '#5B7789',
    transform: 'translateY(-100%)',
    transition: 'all .5s ease-out'
  }

  componentDidMount () {
    // console.log(uuid());
  }

  render () {

    if (this.props.isOpen === true) {
      return (
        <div id="input" className="Input" style={this.style__out}>
          <form onSubmit={e => this.sumbitMessage(e)}>
            <label htmlFor="message" className="inputLabel">What's up?</label>
            <textarea name="message" style={{
              display: 'block',
              padding: '1rem',
              width: '100%',
              flexGrow: '28',
              border: 'none',
              boxSizing: 'border-box',
              resize: 'none',
              transition: 'all 1s ease',
              opacity: '1'
            }} placeholder="I'm having a blast doing..."></textarea>
            <div className="InputBtns">
              <input type="submit" value="Post Message"/>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div id="input" className="Input" style={this.style__hide}>
          <form onSubmit={e => this.sumbitMessage(e)}>
            <label htmlFor="message" className="inputLabel">What's up?</label>
            <textarea name="message" style={{
              display: 'block',
              padding: '1rem',
              boxSizing: 'border-box',
              width: '100%',
              flexGrow: '30',
              border: 'none',
              resize: 'none',
              transition: 'all 1s ease',
              opacity: '0'
            }} placeholder="I'm having a blast doing..."></textarea>
            <div className="InputBtns">
              <input type="submit" value="Post Message"/>
            </div>
          </form>
        </div>
      )
    }
  }
}
