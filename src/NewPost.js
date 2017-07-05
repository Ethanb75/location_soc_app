import React, { Component } from 'react';

export default class NewPost extends Component {
  render () {
    console.log(this.props);
    return (
      <div>
        Here is the new Post input
      </div>
    );
  }
}