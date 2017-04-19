import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { sendMessage, receiveMessage } from 'actions/chatActions';
import { getChattingPartner, getRoom } from 'reducers';
import { Chat, Modal } from '../presentationalComponents';


// This is partly just to keep Chat a functional presentational component
//  even though we want to use some state stuff and the constructor
class ChatWrapper extends Component {
  // TODO research when things should be constructor vs componentDidMount
  constructor(props) {
    super(props);

    const chatIndex = props.chatIndex;

    // TODO move clientside socket config into another file/function?
    this.state = { socket: io(DOMAIN), modalActive: false };

    this.state.socket.on('message', ({ message }) => this.props.receiveMessage(message, chatIndex));
    this.state.socket.on('joined', ({ handle }) => {
      console.log(`${handle} joined`);
      this.setState({ modalActive: true });
    });
    this.state.socket.on('joinResponse', resp => console.log('joinResponse', resp));

    this.state.socket.on('sendResponse', resp => console.log('sendResponse', resp));
    this.state.socket.on('connectionComplete', () => {
      //                                         TODO remove this hardcoding
      this.state.socket.emit('joinQuestion', { room: this.props.room, handle: 'ME' });
    });

    // wrap sendMessage to also emit a socket event
    const wrappedSendMessage = (message) => {
      this.state.socket.emit('sendMessage', { message });
      this.props.sendMessage(message, chatIndex);
    };

    this.newProps = Object.assign({}, this.props, { sendMessage: wrappedSendMessage });
  }

  // TODO drop the modal here
  render() {
    return (
      <div className="chat_part">
        <Modal
          contentLabel="Modal"
          isOpen={this.state.modalActive}
          onRequestClose={() => this.setState({ modalActive: false })}
        >
          <p>An answerer for your question has arrived!</p>
        </Modal>
        <Chat {...this.newProps} />
      </div>
    );
  }
}

// TODO get chatting partner out of state, map state to props
const mapStateToProps = (state, { chatIndex }) => ({
  chattingPartner: getChattingPartner(state, chatIndex),
  room: getRoom(state, chatIndex)
});

export const bindIndexToActionCreator =
  (actionCreator, index) => (...args) => Object.assign(actionCreator(...args), { index });


export default connect(mapStateToProps, { sendMessage, receiveMessage })(ChatWrapper);
