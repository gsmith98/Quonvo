import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { sendMessage, receiveMessage, newChattingPartner, questionReady, endChatThunk, endChat, minimizeChat, notifyMessage } from 'actions/chatActions';
import { getChattingPartner, getRoom, getMyHandle, /* getChatOpen,*/ getMessages, getVisibleChatIndex, isQMine } from 'reducers';
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

    this.state.socket.on('chatEnded', () => {
      this.openModal(false);
    });

    this.state.socket.on('joinResponse', resp => console.log('joinResponse', resp));
    this.state.socket.on('sendResponse', resp => console.log('sendResponse', resp));
    this.state.socket.on('endChatResponse', resp => console.log('endChatResponse', resp));

    this.state.socket.on('connectionComplete', () => {
      this.state.socket.emit('joinQuestion', { room: this.props.room, handle: this.props.yourHandle });
    });
  }

  openModal(endedByMe) {
    this.setState({ modal: true, endedByMe });
  }

  closeModal() {
    this.setState({ modal: false }); // Chat should disappear shortly
  }

  render() {
    console.log('messages', this.props.messages);
    // wrap sendMessage to also emit a socket event
    // this cannot be in constructor since the constructor only runs once. Props wouldn't update
    const wrappedSendMessage = (message) => {
      this.state.socket.emit('sendMessage', { message });
      this.props.sendMessage(message, this.chatIndex);
    };

    // newProps and object.assign are used here because I want to change one of the incoming props
    this.newProps = Object.assign(
      {},
      this.props,
      { sendMessage: wrappedSendMessage }
    );


    const endChatClick = () => {
      console.log('endchatclick. asker', this.props.iAmAsker);
      this.state.socket.emit('endChat');

      // if an answerer clicks end chat, they don't need a modal to open
      if (this.props.iAmAsker) {
        this.openModal(true);
      } else {
        this.props.endChat(this.chatIndex);
      }
    };

    // response is questionAnswered (Yes/No) from asker or 'OK' from answerer not submitting rating
    const onPress = (response, rating) => {
      if (response === 'Yes' || response === 'No') {
        this.closeModal();
        // endChatThunk changes state, AND hits db in a few ways
        this.props.endChatThunk(
         this.props.messages,
         this.props.room,
         this.props.yourHandle,
         rating,
         response
       );
      } else {
        this.closeModal();
        // endChat is just a redux state change
        this.props.endChat(this.chatIndex);
      }
    };

    return (
      this.props.chatOpen ?
        <div className="chat_master">
            <Chat
            endChatClick={endChatClick}
            {...this.newProps}
          />
          <Modal
            contentLabel="Modal"
            isOpen={this.state.modal}
            onRequestClose={() => this.closeModal()}
          >
            <PostChat
              chattingPartner={this.props.chattingPartner}
              endedByMe={this.state.endedByMe}
              iAmAsker={this.props.iAmAsker}
              onPress={onPress}
            />
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
  messages: getMessages(state, chatIndex),
  iAmAsker: isQMine(state, chatIndex)
});


export default connect(
  mapStateToProps,
  {
    sendMessage,
    receiveMessage,
    notifyMessage,
    newChattingPartner,
    questionReady,
    endChatThunk, // this one submits rating, removes from db, archives, etc
    endChat, // this one just changes local state
    minimizeChat
  }
)(ChatWrapper);
