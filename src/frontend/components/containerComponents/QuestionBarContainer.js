import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getMessages } from 'reducers';
import { onQuestionClick } from 'actions/chatActions';
import { getQuestions, getCurrentQuestionPage, getYourQuestion } from 'reducers';
import { loadMoreQuestionsThunk as loadMoreQuestions, nextQuestionPage } from 'actions';
import QuestionBar from '../presentationalComponents/QuestionBar';

const limit = 20;

class QuestionBarWrapper extends Component {

  componentDidMount() {
    this.props.loadMoreQuestions(limit);
  }

  render() {
    return (
      <QuestionBar {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  const numberOfQs = 5;
  const page = getCurrentQuestionPage(state);
  const allQuestions = getQuestions(state);
  const currentQuestions = allQuestions.slice(numberOfQs * page, (numberOfQs * page) + numberOfQs);
  console.log(page);
  console.log(allQuestions);
  console.log(currentQuestions);
  return {
    listOfQuestions: currentQuestions,
    yourQuestion: getYourQuestion(state)
  };
};

export default connect(mapStateToProps,
                      { onQuestionClick, nextQuestionPage, loadMoreQuestions }
                      )(QuestionBarWrapper);
