import { connect } from 'react-redux';
import React, { Component } from 'react';
import SideBar from '../presentationalComponents/SideBar';
// TODO add UI actions for the minimizing and such

class SideBarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, isMinimized: false };
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({ modal: false });
  }

  render() {
    return (
      <SideBar
        isOpen={this.state.modal}
        modalOpen={() => this.modalOpen()}
        modalClose={() => this.modalClose()}
        isMinimized={this.state.isMinimized}
      />
    );
  }
}


export default connect(null, {})(SideBarWrapper);
