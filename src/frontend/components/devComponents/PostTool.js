import React, { Component } from 'react';
import ObjectBuilder from './ObjectBuilder';

class PostTool extends Component {
  constructor(props) {
    super(props);
    this.state = { target: props.url };
  }

  postButtonClick(data) {
    console.log('Posting data to:', this.state.target, data);
    fetch(this.state.target, {
      method: 'post',
      body: JSON.stringify(data)
    }).then((resp) => {
      console.log('Response from post:', resp);
    }).catch((err) => {
      console.log('Error occured! See below.');
      throw err;
    });
  }

  handleChange(event) {
    this.setState({ target: event.target.value });
  }

  render() {
    return (
      <div>
        <p>POST Tool</p>
        Post to:{'              '}
        <input
          type="text"
          onChange={event => this.handleChange(event)}
          value={this.state.target}
          style={{ width: 400 }}
        />
        <ObjectBuilder
          doWithObj={(data) => { this.postButtonClick(data); }}
          buttonMsg="POST"
        />
      </div>
    );
  }
}


export default PostTool;
