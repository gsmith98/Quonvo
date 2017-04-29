import React from 'react';

const ArchivedQuestion = ({ archive }) => (
  <div className="question_box">
    <div className="question_text"> {archive.question} </div>
  </div>
);

export default ArchivedQuestion;
