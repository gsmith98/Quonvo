import React from 'react';

const YourQuestions = ({ onPressButton }) => (
  <div onClick={onPressButton} className="menu_icon">
    <img alt="" src="assets/trophy.svg" className="icon_toobig" />
    <span className="menu_bold"> RANKINGS </span>
  </div>
);

export default YourQuestions;
