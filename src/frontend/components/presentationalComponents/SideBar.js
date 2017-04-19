import React from 'react';
import ArchiveButton from './ArchiveButton';
import AskAQuestion from './AskAQuestion';
import Profile from './Profile';
import YourQuestions from './YourQuestions';

const SideBar = ({ askQuestionClick, clickToMinimize, isMinimized, clickToMaximize }) => (
  (isMinimized) ? (
    <div onClick={clickToMaximize} className="menu_icon">
      <Profile />
      <br />
      <img alt={'Sorry could not be displayed'} src="assets/arrow-01.png" className="icon" />
    </div>
    ) : (
      <div className="menu_attempt">
        <div className="menu_container">
          <Profile />
          <br />
          <AskAQuestion onPressButton={() => askQuestionClick()} />
          <br />
          <ArchiveButton />
          <br />
          <YourQuestions />
          <br />
          <div onClick={clickToMinimize} className="menu_icon">
            <img alt="" src="assets/arrow-01.png" className="icon" />
          </div>
        </div>
      </div>
    )
  );

export default SideBar;
// TODO good place to try out some animations
