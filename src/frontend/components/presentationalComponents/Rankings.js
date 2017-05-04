import React from 'react';

const rankings = ({ topics, setTopic, listRankings, closeRankings }) => (
  <div className="archive_fulldisplay" id="fadeAndScale">
    <div className="archive_question_header">
      <span className="bold_caslon">Archives </span>
      <div onClick={() => closeRankings()} className="right_arrow">
        <img alt="" src="assets/arrow-01.png" className="icon" />
      </div>
    </div>
    <div className="navigation_bar">
      {topics.map(topic =>
        <span
          className="nav bold"
          onClick={() => setTopic(topic)}
        >
          { topic }
        </span>)
    }
    </div>
    { listRankings.map(user =>
      <div className="archives_display">
        <div className="question_box" >
          <div className="archives_text"> {user.rank} </div>
        </div>
      </div>
  )}
  </div>
);

export default rankings;
