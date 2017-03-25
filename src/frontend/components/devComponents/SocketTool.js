import React, { Component } from 'react';
import io from 'socket.io-client';
import ObjectBuilder from './ObjectBuilder';

class SocketTool extends Component {
  constructor(props) {
    super(props);
    this.state = { socket: null };
  }

  openSocket() {
    const newSocket = io(this.props.url);

    // Custom middleware for detailed logging of all incoming socket events
    const oldOnevent = newSocket.onevent.bind(newSocket);
    newSocket.onevent = (packet) => {
      console.log('Incoming socket event on channel:', packet.data[0]);
      console.log('Received data:', packet.data[1]);
      oldOnevent(packet);     // original call
    };

    // Custom middleware for detailed logging of all outgoing socket events
    const oldEmit = newSocket.emit.bind(newSocket);
    newSocket.emit = (channel, data) => {
      if (channel !== 'ping' && channel !== 'pong') { // internal socket implementation details
        console.log('Outgoing socket event on channel:', channel);
        console.log('Sent data:', data);
      }
      oldEmit(channel, data);
    };

    this.setState({ socket: newSocket });
  }

  socketButtonClick(data) {
    this.state.socket.emit(this.channel.value, data);
  }

  render() {
    return (
      <div>
        {this.state.socket ?
          <div>
            <p>Socket Tool</p>
            <input type="text" ref={(node) => { this.channel = node; }} placeholder="channel" />
            <ObjectBuilder
              doWithObj={(data) => { this.socketButtonClick(data); }}
              buttonMsg="Send on socket"
            />
          </div>
          : <button onClick={() => this.openSocket()}>Open socket connection</button>
        }
      </div>
    );
  }
}


export default SocketTool;
