import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getArchives } from 'reducers';
import { newArchivesThunk, closeArchives } from 'actions';
import Archives from '../presentationalComponents/Archives';
import ArchivedConversation from '../presentationalComponents/ArchivedConversation';
// TODO artchived messages are working just no appearing because the styling is shit LOL
class ArchivesWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, topic: 'Stuff', getMessages: false, messages: null };
  }

  nextPage(numberPerPage) {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
    const pageNumber = this.state.page;
    this.props.newArchivesThunk(this.state.topic, pageNumber, numberPerPage);
  }

  newTopic(topic, numberPerPage) {
    this.setState({ page: 0, topic });
    const pageNumber = this.state.page;
    this.props.newArchivesThunk(topic, pageNumber, numberPerPage);
  }

  openMessages(messages) {
    this.setState({ getMessages: true, messages });
    console.log('i got here');
  }
  render() {
    const newProps = Object.assign(
      {}, this.props, {
        nextPage: this.nextPage.bind(this),
        newTopic: this.newTopic.bind(this),
        openMessages: this.openMessages.bind(this)
      }
    );
    const messages = this.state.messages;
    console.log('the state', this.state);
    return (
      <div>
        <Archives {...newProps} />
        {this.state.getMessages ? <ArchivedConversation messages={messages} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  archives: getArchives(state)
});

export default connect(mapStateToProps, { newArchivesThunk, closeArchives })(ArchivesWrapper);
