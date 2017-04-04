import React from 'react';

const YourQuestions = ({ onPressButton }) => (
  <div onClick={onPressButton} className="menu_icon">
    <img alt="" src="./assets/question_icon.png" Nameclass="icon_toobig" />
    <span className="menu_bold"> YOUR <br /> QUESTIONS </span>
  </div>

);

export default YourQuestions;
