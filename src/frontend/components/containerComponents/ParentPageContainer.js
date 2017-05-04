import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChats, areArchivesOpen, areRankingsOpen } from 'reducers';
import io from 'socket.io-client';
import { ParentPage } from '../presentationalComponents';

class ParentPageWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { socket: io(DOMAIN) };

    this.state.socket.on('connectionComplete', () => {
      this.state.socket.emit('joinMain');
    });
  }

  render() {
    return (
      <ParentPage {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  // map from dict of chats objects to array of chatObjects which now include their dict key
  chats: Object.keys(getChats(state))
          .map(key => Object.assign({}, getChats(state)[key], { chatIndex: key })),
  archives: areArchivesOpen(state),
  rankings: areRankingsOpen(state)
});

export default connect(mapStateToProps, null)(ParentPageWrapper);
