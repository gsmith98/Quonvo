import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import LiveQuestion from './LiveQuestion';
// The liftOfQustions is an array of objects that has the keys content, subject, and id
const QuestionBar = ({
   listOfQuestions, onQuestionClick, nextQuestionPage, previousQuestionPage
}) => (
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
            onQuestionClick={() => onQuestionClick(question.id, question.handle)}
            questionText={question.content}
            questionSubject={question.subject}
          />
      )
      }
      </div>
    </div>
    <ButtonGroup className="navigate_buttons">
      <Button onClick={() => previousQuestionPage()} bsSize="large">
      Previous
      </Button>
      <Button onClick={() => nextQuestionPage()} bsSize="large">
      Next
      </Button>
    </ButtonGroup>
  </div>
);

export default QuestionBar;
