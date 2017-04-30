import React from 'react';
import ReactStars from 'react-stars';


const ArchivedQuestion = ({ archive, onClick, key }) => (
  <div className="question_box" onClick={() => onClick()} key={key}>
    <div className="question_text"> {archive.question} </div>
    <ReactStars
      className="star_rating"
      count={5}
      value={archive.rating}
      edit={false}
      half={true}
      size={20}
    />
  </div>
);

export default ArchivedQuestion;
