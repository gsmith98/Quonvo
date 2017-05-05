import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { sendMessage, receiveMessage, newChattingPartner, questionReady, endChatThunk, minimizeChat, notifyMessage } from 'actions/chatActions';
import { getChattingPartner, getRoom, getMyHandle, /* getChatOpen,*/ getMessages, getVisibleChatIndex } from 'reducers';
import { Chat, Modal, PostChat } from '../presentationalComponents';


class ChatWrapper extends Component {
  constructor(props) {
    super(props);

    this.chatIndex = props.chatIndex;

    // TODO move clientside socket config into another file/function?
    this.state = { socket: io(DOMAIN), modal: false };

    this.state.socket.on('message', ({ message }) => {
      this.props.receiveMessage(message, this.chatIndex);
      if (!this.props.chatOpen) {
        this.props.notifyMessage(this.chatIndex);
      }
    });
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
  openModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  render() {
    console.log('messages', this.props.messages);
    // wrap sendMessage to also emit a socket event
    // this cannot be in constructor since the constructor only runs once. Props wouldn't update
    const wrappedSendMessage = (message) => {
      this.state.socket.emit('sendMessage', { message });
      this.props.sendMessage(message, this.chatIndex);
    };

    this.newProps = Object.assign(
                    {},
                    this.props,
                    { sendMessage: wrappedSendMessage },
                    { openModal: () => this.openModal() }
                    );
    this.modalProps = Object.assign(
      {},
      { submitRating: (rating, questionAnswered) => this.props.endChatThunk(
        this.props.messages,
        this.props.room,
        this.props.yourHandle,
        rating,
        questionAnswered
        ) },
      { closeModal: () => this.closeModal() }
    );
    return (
      this.props.chatOpen ?
        <div className="chat_master">
          <Chat {...this.newProps} />
          <Modal
            contentLabel="Modal"
            isOpen={this.state.modal}
            onRequestClose={() => this.closeModal()}
          >
            <PostChat {...this.modalProps} />
          </Modal>

        </div>
      : null
    );
  }
}

const mapStateToProps = (state, { chatIndex }) => ({
  chattingPartner: getChattingPartner(state, chatIndex),
  room: getRoom(state, chatIndex),
  yourHandle: getMyHandle(state, chatIndex),
  chatOpen: getVisibleChatIndex(state) === chatIndex, // getChatOpen(state, chatIndex),
  messages: getMessages(state, chatIndex)
});


export default connect(
  mapStateToProps,
  {
    sendMessage,
    receiveMessage,
    notifyMessage,
    newChattingPartner,
    questionReady,
    endChatThunk,
    minimizeChat
  }
)(ChatWrapper);
