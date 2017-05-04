import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getRankings } from 'reducers';
import { newRankingsThunk, closeRankings } from 'actions';

import Rankings from '../presentationalComponents/Rankings';

const topics = ['Stuff', 'Travel1', 'Travel2', 'Travel'];
class RankingsWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = { topic: 'Stuff' };
  }

  setTopic(topic) {
    this.setState({ topic });
    this.props.newRankingsThunk(this.state.topic);
  }

  render() {
    const newProps = Object.assign({}, this.props, {
      setTopic: this.setTopic.bind(this),
      topics
    });

    return (
      <Rankings {...newProps} />
    );
  }
}

const mapStateToProps = state => ({
  rankings: getRankings(state)
});


export default connect(mapStateToProps, { newRankingsThunk, closeRankings })(RankingsWrapper);
