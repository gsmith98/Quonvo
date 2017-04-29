import React from 'react';
import ArchivedQuestion from './ArchivedQuestion';

const topics = ['Stuff', 'Travel'];
const topic1 = topics[0];
const topic2 = topics[1];
const numberPerPage = 5;

const Archives = ({ archives, nextPage, newTopic, closeArchives, openMessages }) => (
  <div className="archive_fulldisplay">
    <div className="archive_question_header">
      <span className="bold_caslon">Archives </span>
    </div>
    <div className="navigation_bar">
      <span
        className="nav bold"
        onClick={() => newTopic(topic1, numberPerPage)}
      >
        { topic1 }
      </span>
      <span className="nav bold" onClick={() => newTopic(topic2, numberPerPage)}> { topic2 } </span>
      <span className="nav bold" onClick={() => nextPage(numberPerPage)}> NEXT PAGE </span>
      <span className="nav bold" onClick={() => closeArchives()}> GO BACK </span>
    </div>
    <div className="question_display">
      {archives.map(archive =>
        <ArchivedQuestion
          archive={archive}
          key={archive.id}
          onClick={() => openMessages(archive.messages)}
        />
      )
      }
    </div>
  </div>
);

export default Archives;
