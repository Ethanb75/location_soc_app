import React, { Component } from 'react';
import firebase from './firebase';

export default class NewPost extends Component {
  state = {width: 0}
  hide = {
    transform: `translateX(100%)`,
    position: 'fixed',
    right: 0,
    color: 'rgb(15,15,15)',
    backgroundColor: 'wheat',
    padding: '1rem',
    transition: 'all .35s ease-out',
    top: '0',
    width: '50vw'
  }
  show = {
    transform: 'translateX(0px)',
    position: 'fixed',
    right: '0',
    color: 'rgb(15,15,15)',
    backgroundColor: 'wheat',
    padding: '1rem',
    transition: 'all .35s ease-out',
    top: '0',
    width: '50vw'
  }
  submitMessage (e) {
    e.preventDefault();
    console.log('submit! ', e.target.children[0].value);
    
    // function fakePost (message, username, location) {
    // firebase.database().ref('posts/' + '1').set({
    //     // profile_picture : imageUrl,
    //     username,
    //     message,
    //     location
    //   });
    // }


  }
  render () {
    console.log(this.props);
    if (this.props.isOpen == true) {
      return (
        <div id="messageBox" style= {this.show}>
          <form action="" onSubmit={e => this.submitMessage(e)}>
            <input type="text" placeholder="message"></input>
            <input type="submit" />
          </form>
        </div>
      );
    } else if (this.props.isOpen == false) {
      return (
        <div id="messageBox" style= {this.hide}>
          <form action="" onSubmit={e => this.submitMessage(e)}>
            <input type="text" placeholder="message"></input>
            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}