import React from 'react';
import ArchiveButton from './ArchiveButton';
import AskAQuestion from './AskAQuestion';
import Profile from './Profile';
import YourQuestions from './YourQuestions';

const SideBar = ({
  isMinimized,
  askQuestionClick,
  archivesClick,
  rankingsClick,
  minimizeClick,
  maximizeClick
}) => (
  (isMinimized) ? (
    <div onClick={() => maximizeClick()} className="menu_icon">
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
          <ArchiveButton onPressButton={() => archivesClick()} />
          <br />
          <YourQuestions onPressButton={() => rankingsClick()} />
          <br />
          <div onClick={() => minimizeClick()} className="menu_icon">
            <img alt="" src="assets/arrow-01.png" className="icon" />
          </div>
        </div>
      </div>
    )
  );

export default SideBar;
// TODO good place to try out some animations
