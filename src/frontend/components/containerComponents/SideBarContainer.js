import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fullArchives, newArchivesThunk } from 'actions';
import { SideBar, Modal } from '../presentationalComponents/';
import { WriteQuestionContainer } from '../containerComponents';
// TODO add UI actions for the minimizing and such

const numberPerPage = 5;

class SideBarWrapper extends Component {
  constructor(props) {
    super(props);
    // TODO will isMinimized be a part of local state or redux state?
    this.state = { questionModalActive: false, isMinimized: false };
  }

  onArchiveClick() {
    this.props.newArchivesThunk('Stuff', 0, numberPerPage);
    this.props.fullArchives(); // Ask about Async stuff here
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
      <div className="menu_wrapper">
        <Modal
          contentLabel="Modal"
          isOpen={this.state.questionModalActive}
          onRequestClose={() => this.questionModalClose()}
        >
          <WriteQuestionContainer afterSubmit={() => this.questionModalClose()} />
        </Modal>
        <SideBar
          isMinimized={this.state.isMinimized}
          askQuestionClick={() => this.questionModalOpen()}
          archivesClick={() => this.onArchiveClick()}
          yourQuestionsClick={() => console.log('yourQuestionsClick')}
          minimizeClick={() => console.log('minimizeClick')}
          maximizeClick={() => console.log('maximizeClick')}
        />
      </div>
    );
  }
}


export default connect(null, { fullArchives, newArchivesThunk })(SideBarWrapper);
