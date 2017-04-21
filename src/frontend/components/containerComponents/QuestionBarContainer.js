import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getMessages } from 'reducers';
import { onQuestionClick } from 'actions/chatActions';

import { getQuestions, getCurrentQuestionPage, getYourQuestion } from 'reducers';
import { loadMoreQuestionsThunk as loadMoreQuestions, nextQuestionPage, previousQuestionPage, firstQuestionPage } from 'actions';
import QuestionBar from '../presentationalComponents/QuestionBar';

const limit = 1000;
const questionRefresh = 5000;
const numberOfQs = 5;

class QuestionBarWrapper extends Component {

  componentDidMount() {
    this.props.loadMoreQuestions(limit);
    this.interval = setInterval(() => this.props.nextQuestionPage(), questionRefresh);
  }


  componentDidUpdate() {
    if (this.props.listOfQuestions.length === 0) {
      console.log('i got here');
      this.props.firstQuestionPage();
    }
    const questions = this.props.allQuestions;
    console.log(questions);
    const page = this.props.currentPage;
    let mostRecent = 0;
    for (let i = 0; i < questions.length; i++) {
      const date = Date.parse(questions[i].createdTime);
      if (date > mostRecent) mostRecent = date;
    }
    console.log(mostRecent, 'I GOT HERE');

    const howEarlyShouldWeLoad = 2;
    if ((questions / page) < numberOfQs * howEarlyShouldWeLoad) {
      // this.props.loadMoreQuestions('newQuestions');
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <QuestionBar {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  const page = getCurrentQuestionPage(state);
  const allQuestions = getQuestions(state);
  console.log(firstQuestionPage);

  const currentQuestions = allQuestions.slice(numberOfQs * page, (numberOfQs * page) + numberOfQs);

  console.log(page);
  console.log(allQuestions);
  console.log(currentQuestions);
  return {
    listOfQuestions: currentQuestions,
    allQuestions,
    currentPage: page,
    yourQuestion: getYourQuestion(state)
  };
};

export default connect(mapStateToProps,
{ onQuestionClick, nextQuestionPage, loadMoreQuestions, previousQuestionPage, firstQuestionPage }
)(QuestionBarWrapper);
