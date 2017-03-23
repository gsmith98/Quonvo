import React, { Component } from 'react';
import io from 'socket.io-client';

class SocketTool extends Component {
  componentDidMount() {
    this.socket = io('http://localhost:3000');
    const onevent = this.socket.onevent;
    this.socket.onevent = function (packet) {
      const args = packet.data || [];
      onevent.call(this, packet);    // original call
      packet.data = ['*'].concat(args);
      onevent.call(this, packet);      // additional call to catch-all
    };


    this.socket.on('*', (evt, data) => {
      console.log("event", evt);
      console.log("data", data);
    });

    this.socket.on('heyo', () => console.log("also here!"));
  }

  render() {
    return (
      <p>here</p>
    );
  }
}

export default SocketTool;
