import { connect } from 'react-redux';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { SideBar } from '../presentationalComponents/';
import { WriteQuestionContainer } from '../containerComponents';
// TODO add UI actions for the minimizing and such

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class SideBarWrapper extends Component {
  constructor(props) {
    super(props);
    // TODO will isMinimized be a part of local state or redux state?
    this.state = { questionModalActive: false, isMinimized: false };
  }

  questionModalOpen() {
    this.setState({ questionModalActive: true });
  }

  questionModalClose() {
    this.setState({ questionModalActive: false });
  }

  // TODO pass the SideBar clickToMinimize and clickToMaximize
  render() {
    return (
      <div>
        <Modal
          style={customStyles}
          contentLabel="Modal"
          isOpen={this.state.questionModalActive}
          onRequestClose={() => this.questionModalClose()}
        >
          <WriteQuestionContainer afterSubmit={() => this.questionModalClose()} />
        </Modal>
        <SideBar
          isMinimized={this.state.isMinimized}
          askQuestionClick={() => this.questionModalOpen()}
        />
      </div>
    );
  }
}


export default connect(null, {})(SideBarWrapper);
