import React from 'react';
import LiveQuestion from './LiveQuestion';
// The liftOfQustions is an array of objects that has the keys content, subject, and id
const limit = 20;
const QuestionBar = ({ listOfQuestions, onQuestionClick, loadMoreQuestions }) => (
  <div className="question_bar">
    <div
      className="question_header bold"
      style={{ letterSpacing: '0.1vw' }}
    >
      LEND AN EAR
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
      <button onClick={() => loadMoreQuestions(limit)}>
      Get more questions
      </button>
    </div>
  </div>
);

export default QuestionBar;
