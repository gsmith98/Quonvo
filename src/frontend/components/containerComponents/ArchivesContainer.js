import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getArchives } from 'reducers';
import { newArchivesThunk, closeArchives } from 'actions';
import Archives from '../presentationalComponents/Archives';

class ArchivesWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, topic: 'Stuff' };
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

  render() {
    const newProps = Object.assign(
      {}, this.props, { nextPage: this.nextPage.bind(this), newTopic: this.newTopic.bind(this) }
    );
    return (
      <Archives {...newProps} />
    );
  }
}

const mapStateToProps = state => ({
  archives: getArchives(state)
});

export default connect(mapStateToProps, { newArchivesThunk, closeArchives })(ArchivesWrapper);
