import { connect } from 'react-redux';
import React, { Component } from 'react';
import SideBar from '../presentationalComponents/QuestionBar';

class SideBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({ modal: false });
  }

  render() {
    return (
      <SideBar isOpen={this.state.modal} modalOpen={this.modalOpen} modalClose={this.modalClose} />
    );
  }
}
