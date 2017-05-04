import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import LiveQuestion from './LiveQuestion';
// The liftOfQustions is an array of objects that has the keys content, subject, and id
const QuestionBar = ({
   listOfQuestions,
   onQuestionClick,
   yourQuestion,
   yourQuestionClick,
   yourQuestionReady,
   nextQuestionClick,
   previousQuestionClick,
   onMouseHover,
   onMouseLeave
}) => (

  <div className="question_bar">
    <div
      className="question_header bold"
      style={{ letterSpacing: '0.1vw' }}
    >
      LEND AN EAR
    </div>
    { yourQuestion ?
      <div className="yourQuestion">
        Your Question
        <LiveQuestion
          onQuestionClick={() => yourQuestionClick(yourQuestion.id)}
          questionClickable={yourQuestionReady}
          questionShade={yourQuestionReady ? 'red' : null} // TODO make css and better
          questionText={yourQuestion.content}
          questionSubject={yourQuestion.subject}
          questionHandle={yourQuestion.handle}
        />
      </div>
      : null }
    <div className="question_sidebar_display">
      <div className="question_column">
        {listOfQuestions.map(question =>
          <LiveQuestion
            key={question.id}
            onQuestionClick={() => onQuestionClick(question.id, question.handle)}
            onMouseOver={onMouseHover}
            onMouseOut={onMouseLeave}
            questionClickable={true}
            questionText={question.content}
            questionSubject={question.subject}
            questionHandle={question.handle}
          />
      )
      }
      </div>
    </div>
    <ButtonGroup className="navigate_buttons">
      <Button onClick={() => previousQuestionClick()} bsSize="large">
      Previous
      </Button>
      <Button onClick={() => nextQuestionClick()} bsSize="large">
      Next
      </Button>
    </ButtonGroup>
  </div>
);

export default QuestionBar;
