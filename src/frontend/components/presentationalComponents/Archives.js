import React from 'react';
import ArchivedQuestion from './ArchivedQuestion';


const listOfArchivedQuestions = ['hello why is Mitchell mean?', 'why does Graham smell so bad?'];


const Archives = (/* {listOfArchivedQuestions} */) => (
  <div className="archive_fulldisplay">
    <div className="archive_question_header">
      <span className="bold_caslon">Archives </span>
    </div>
    <div className="navigation_bar">
      <span className="nav bold"> TECH </span>
      <span className="nav bold"> RELATIONSHIPS </span>
      <span className="nav bold"> ADVICE </span>
      <span className="nav bold"> CAREERS </span>
    </div>


    <div className="question_display">
      {listOfArchivedQuestions.map(question =>
        <ArchivedQuestion
          question={question}
        />
      )
      }
    </div>
  </div>
);

export default Archives;
