import React from 'react';
import Modal from 'react-modal';
import Archives from './Archives';
import AskAQuestion from './AskAQuestion';
import Profile from './Profile';
import YourQuestions from './YourQuestions';
import { WriteQuestionContainer } from '../containerComponents';

const SideBar = ({
   isOpen, modalOpen, modalClose, clickToMinimize, isMinimized, clickToMaximize
  }) => {
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

  if (!isMinimized) {
    return (
      <div>
        <Modal contentLabel="Modal" isOpen={isOpen} onRequestClose={() => modalClose()} >
          <WriteQuestionContainer afterSubmit={() => modalClose()} />
        </Modal>
        <div className="menu_attempt">
          <div className="menu_container">
            <Profile />
            <br />
            <AskAQuestion onPressButton={() => modalOpen()} />
            <br />
            <Archives />
            <br />
            <YourQuestions />
            <br />
            <div onClick={clickToMinimize} className="menu_icon">
              <img alt="" src="assets/arrow-01.png" className="icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div onClick={clickToMaximize} className="menu_icon">
      <Profile />
      <br />
      <img alt={'Sorry could not be displayed'} src="assets/arrow-01.png" className="icon" />
    </div>
  );
};

export default SideBar;
// TODO good place to try out some animations
