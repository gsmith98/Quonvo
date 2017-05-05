import React from 'react';
import ArchivedQuestion from './ArchivedQuestion';
import ArchivedConversation from '../presentationalComponents/ArchivedConversation';

const topics = ['Stuff', 'Stuff1', 'Stuff2', 'Travel'];
const numberPerPage = 5;

const Archives = ({
  archives,
  nextPage,
  newTopic,
  closeArchives,
  openMessages,
  areMessagesOpen,
  messages,
  backToArchives,
  previousPage,
  currentTopic
}) => (
  <div className="archive_fulldisplay" id="fadeAndScale">
    <div className="archive_question_header">
      <span className="bold_caslon">Archives </span>
      <div onClick={() => closeArchives()} className="right_arrow">
        <img alt="" src="assets/arrow-01.png" className="icon" />
      </div>
    </div>
    <div className="navigation_bar">
      {topics.map((topic) => {
        if (currentTopic === topic) {
          return (<span
            style={{ opacity: 0.5, fontSize: '1.6vw' }}
            className="nav bold"
            onClick={() => newTopic(topic, numberPerPage)}
          >
            { topic }
          </span>);
        }
        return (<span
          className="nav bold"
          onClick={() => newTopic(topic, numberPerPage)}
        >
          { topic }
        </span>);
      })
    }
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
    {areMessagesOpen ? <div /> :
    <div className="navigation_buttons">
      <div className="previous_archives" onClick={() => previousPage(numberPerPage)}>
        <img className="arrow_icon" alt="" src="assets/left-arrow.svg" />
      </div>
      <div className="next_archives" onClick={() => nextPage(numberPerPage)}>
        <img className="arrow_icon" alt="" src="assets/left-arrow.svg" />
      </div>
    </div>
  }
  </div>

);

export default Archives;
