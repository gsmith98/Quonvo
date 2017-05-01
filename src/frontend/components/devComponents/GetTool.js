import React, { Component } from 'react';

class GetTool extends Component {
  constructor(props) {
    super(props);
    this.state = { target: props.url };
  }

  getButtonClick() {
    console.log('Getting data from:', this.state.target);
    fetch(this.state.target, {
      method: 'get',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include'
    })
    .then(resp => resp.json())
    .then((respjson) => {
      console.log('Response from post:', respjson);
    })
    .catch((err) => {
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
        Get from:
        <input
          type="text"
          onChange={event => this.handleChange(event)}
          value={this.state.target}
          style={{ width: 400, marginLeft: 30 }}
        />
        <button onClick={() => this.getButtonClick()}>GET</button>
      </div>
    );
  }
}


export default GetTool;
