import React, { Component } from 'react';
import ObjectBuilder from './ObjectBuilder';

class PostTool extends Component {
  postButtonClick(data) {
    console.log('Posting data:', data);
    fetch(this.props.url, {
      method: 'post',
      body: JSON.stringify(data)
    }).then((resp) => {
      console.log('Response from post:', resp);
    }).catch((err) => {
      console.log('Error occured! See below.');
      throw err;
    });
  }

  render() {
    return (
      <div>
        <p>POST Tool</p>
        <ObjectBuilder
          doWithObj={(data) => { this.postButtonClick(data); }}
          buttonMsg="POST"
        />
      </div>
    );
  }
}


export default PostTool;
