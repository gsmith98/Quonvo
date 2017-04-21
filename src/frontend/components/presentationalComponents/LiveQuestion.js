import React from 'react';

const LiveQuestion = ({ questionText, onQuestionClick, /* questionSubject,*/ questionHandle }) => (
  <div onClick={onQuestionClick} className="questionTALL">
    <div className="question_text"> {questionText} </div>
    {/* <span className="question_label"> {questionSubject} </span> */}
    <span className="question_label"> {questionHandle} </span>
  </div>
);

export default LiveQuestion;
