import React from 'react';

const LiveQuestion = ({
  questionText,
  onQuestionClick,
  questionSubject,
  onMouseOver,
  onMouseOut,
/* questionHandle , */
  questionClickable,
  questionShade // for yourQuestion readiness or also potentially hotness
}) => (
  <div
    onClick={questionClickable ? onQuestionClick : null}
    className="questionTALL"
    onMouseOver={() => onMouseOver()}
    onMouseLeave={() => onMouseOut()}
    style={questionShade ? { backgroundColor: questionShade } : null}
  >
    <div className="question_text">
      {questionText}
    </div>
    { /* <span className="question_label"> {questionHandle} </span> */ }
    <span className="question_label"> {questionSubject} </span>
  </div>
);

export default LiveQuestion;
