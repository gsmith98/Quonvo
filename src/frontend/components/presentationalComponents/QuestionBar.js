import React from 'react';
import LiveQuestion from './LiveQuestion';
// The liftOfQustions is an array of objects that has the keys content, subject, and id
const QuestionBar = ({ listOfQuestions, onQuestionClick }) => (
  <div className="question_bar">
    <div
      className="question_header bold"
      style={{ fontSize: '18px', padding: '2vh 0vh 0vh 3vh' }}
    >
      Lend an Ear
    </div>
    <div className="question_sidebar_display">
      <div className="question_column">
        {listOfQuestions.map(question =>
          <LiveQuestion
            key={question.id}
            onQuestionClick={() => onQuestionClick(question.id)}
            questionText={question.content}
            questionSubject={question.subject}
          />
      )
      }
      </div>
    </div>
  </div>
);

export default QuestionBar;
