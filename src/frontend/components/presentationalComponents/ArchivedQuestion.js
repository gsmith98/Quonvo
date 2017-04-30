import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const ArchivedQuestion = ({ archive, onClick, key }) => (
  <div className="question_box" onClick={() => onClick()} key={key}>
    <div className="question_text"> {archive.question} </div>
  </div>
);

export default ArchivedQuestion;
