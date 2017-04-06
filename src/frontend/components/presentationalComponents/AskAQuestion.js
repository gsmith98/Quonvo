import React from 'react';

const AskAQuestion = ({ onPressButton }) => (
  <div className="menu_icon" onClick={onPressButton}>
    <img alt="" src="assets/q_icon-01.png" className="icon_toobig" />
    <span className="menu_bold"> ASK A <br /> QUESTION </span>
  </div>
);

export default AskAQuestion;
