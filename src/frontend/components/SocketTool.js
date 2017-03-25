import React, { Component } from 'react';
import io from 'socket.io-client';
import ObjectBuilder from './ObjectBuilder';

class SocketTool extends Component {
  componentDidMount() {
    this.socket = io('http://localhost:3000');

    // Custom middleware for detailed logging of all incoming socket events
    const oldOnevent = this.socket.onevent.bind(this.socket);
    this.socket.onevent = (packet) => {
      console.log('Incoming socket event on channel:', packet.data[0]);
      console.log('Received data:', packet.data[1]);
      oldOnevent(packet);     // original call
    };

    // Custom middleware for detailed logging of all outgoing socket events
    const oldEmit = this.socket.emit.bind(this.socket);
    this.socket.emit = (channel, data) => {
      if (channel !== 'ping' && channel !== 'pong') { // internal socket implementation details
        console.log('Outgoing socket event on channel:', channel);
        console.log('Sent data:', data);
      }
      oldEmit(channel, data);
    };

    this.forceUpdate();
  }

  socketButtonClick(data) {
    this.socket.emit(this.channel.value, data);
  }

  render() {
    return (
      <div>
        {this.socket ?
          <div>
            <input type="text" ref={(node) => { this.channel = node; }} placeholder="channel" />
            <ObjectBuilder
              doWithObj={(data) => { this.socketButtonClick(data); }}
              buttonMsg="Send on socket"
            />
          </div>
          : 'Connecting...'
        }
      </div>
    );
  }
}


export default SocketTool;
