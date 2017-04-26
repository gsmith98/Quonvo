import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { sendMessage, receiveMessage, newChattingPartner, questionReady, minimizeChat } from 'actions/chatActions';
import { getChattingPartner, getRoom, getMyHandle, getChatOpen } from 'reducers';
import { Chat } from '../presentationalComponents';


// This is partly just to keep Chat a functional presentational component
//  even though we want to use some state stuff and the constructor
class ChatWrapper extends Component {
  // TODO research when things should be constructor vs componentDidMount
  constructor(props) {
    super(props);

    this.chatIndex = props.chatIndex;

    // TODO move clientside socket config into another file/function?
    this.state = { socket: io(DOMAIN) };

    this.state.socket.on('message', ({ message }) => this.props.receiveMessage(message, this.chatIndex));
    this.state.socket.on('joined', ({ handle }) => {
      this.props.newChattingPartner(handle, this.chatIndex);
      this.props.questionReady();
    });
    this.state.socket.on('joinResponse', resp => console.log('joinResponse', resp));

    this.state.socket.on('sendResponse', resp => console.log('sendResponse', resp));
    this.state.socket.on('connectionComplete', () => {
      this.state.socket.emit('joinQuestion', { room: this.props.room, handle: this.props.yourHandle });
    });
  }

  render() {
    // wrap sendMessage to also emit a socket event
    // this cannot be in constructor since the constructor only runs once. Props wouldn't update
    const wrappedSendMessage = (message) => {
      this.state.socket.emit('sendMessage', { message });
      this.props.sendMessage(message, this.chatIndex);
    };

    this.newProps = Object.assign({}, this.props, { sendMessage: wrappedSendMessage });

    return (
      this.props.chatOpen ?
        <div className="chat_part">
          <Chat {...this.newProps} />
        </div>
      : null
    );
  }
}

const mapStateToProps = (state, { chatIndex }) => ({
  chattingPartner: getChattingPartner(state, chatIndex),
  room: getRoom(state, chatIndex),
  yourHandle: getMyHandle(state, chatIndex),
  chatOpen: getChatOpen(state, chatIndex)
});


export default connect(
  mapStateToProps,
  {
    sendMessage,
    receiveMessage,
    newChattingPartner,
    questionReady,
    minimizeChat
  }
)(ChatWrapper);
