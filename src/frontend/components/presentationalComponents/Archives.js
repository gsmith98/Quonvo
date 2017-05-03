import React from 'react';
import ArchivedQuestion from './ArchivedQuestion';
import ArchivedConversation from '../presentationalComponents/ArchivedConversation';

const topics = ['Stuff', 'Travel'];
const topic1 = topics[0];
const topic2 = topics[1];
const numberPerPage = 5;

const Archives = ({
  archives,
  nextPage,
  newTopic,
  closeArchives,
  openMessages,
  areMessagesOpen,
  messages,
  backToArchives
}) => (
  <div className="archive_fulldisplay" id="fadeAndScale">
    <div className="archive_question_header">
      <span className="bold_caslon">Archives </span>
      <div onClick={() => closeArchives()} className="right_arrow">
        <img alt="" src="assets/arrow-01.png" className="icon" />
      </div>
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
    <div className="archives_display">
      {areMessagesOpen
      ?
        <ArchivedConversation messages={messages} backToArchives={() => backToArchives()} />
      :
        archives.map(archive =>
          <ArchivedQuestion
            archive={archive}
            key={archive.id}
            onClick={() => openMessages(archive.messages)}
          />
        )
      }
    </div>
    <div className="navigation_buttons">
      <div className="previous_archives">
        <img className="icon" alt="" src="assets/left-arrow.svg" />
      </div>
      <div className="next_archives">
        <img className="icon" alt="" src="assets/left-arrow.svg" />
      </div>
    </div>
  </div>
);

export default Archives;
