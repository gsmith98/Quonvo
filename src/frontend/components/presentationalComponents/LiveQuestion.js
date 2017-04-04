import React from 'react';

const LiveQuestion = ({ questionText, onQuestionClick, questionSubject }) => (
  <div onClick={onQuestionClick} className="questionTALL">
    <div className="question_text"> {questionText} </div>
    <span className="question_label"> {questionSubject} </span>
  </div>
);

export default LiveQuestion;
