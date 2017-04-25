import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onQuestionClick } from 'actions/chatActions';
import { getQuestions, getCurrentQuestionPage, getYourQuestion } from 'reducers';
import { loadMoreQuestionsThunk as loadMoreQuestions, nextQuestionPage, previousQuestionPage, firstQuestionPage } from 'actions';
import { QuestionBar, Modal } from '../presentationalComponents';

const limit = 1000;
const questionRefresh = 1000000; // TODO make a realistic value
const numberOfQs = 5;
const howEarlyShouldWeLoad = -1; // TODO make a realistic value (see git issue #187)

class QuestionBarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { answerModalActive: false, clickedQid: null, clickedQhandle: null };
  }

  componentDidMount() {
    this.props.loadMoreQuestions(limit, 0);
    this.interval = setInterval(() => this.props.nextQuestionPage(), questionRefresh);
  }

  componentDidUpdate() {
    const questions = this.props.allQuestions;
    console.log(questions);
    const page = this.props.currentPage;
    let mostRecent = 0;

    if ((questions.length / numberOfQs) < page) {
      this.props.firstQuestionPage();
    }
    for (let i = 0; i < questions.length; i++) {
      const date = questions[i].createdTime;
      if (date > mostRecent) mostRecent = date;
    }

    if ((questions.length / numberOfQs) < page + howEarlyShouldWeLoad) {
      this.props.loadMoreQuestions(limit, mostRecent);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  previousQuestion() {
    this.props.previousQuestionPage();
    clearInterval(this.interval);
    this.interval = setInterval(() => this.props.nextQuestionPage(), questionRefresh);
  }

  nextQuestion() {
    this.props.nextQuestionPage();
    clearInterval(this.interval);
    this.interval = setInterval(() => this.props.nextQuestionPage(), questionRefresh);
  }
  submitModal(handleField) {
    const chosenHandle = handleField.value.trim() || 'Anonymous';

    this.props.onQuestionClick(this.state.clickedQid, this.state.clickedQhandle, chosenHandle);
    this.closeModal();
  }

  openModal(id, theirHandle) {
    this.setState({ answerModalActive: true, clickedQid: id, clickedQhandle: theirHandle });
  }

  closeModal() {
    this.setState({ answerModalActive: false, clickedQid: null, clickedQhandle: null });
  }

  render() {
    const newProps = Object.assign(
      {},
      this.props,
      { onQuestionClick: (id, theirHandle) => this.openModal(id, theirHandle),
        nextQuestionClick: () => this.nextQuestion(),
        previousQuestionClick: () => this.previousQuestion() }
      );
    let handleField;

    return (
      <div>
        <Modal
          contentLabel="Modal"
          isOpen={this.state.answerModalActive}
          onRequestClose={() => this.closeModal()}
        >
          <div>Answer this question under what name?</div>
          <input type="text" placeholder="Anonymous" ref={(node) => { handleField = node; }} />
          <button onClick={() => this.submitModal(handleField)}>Answer Question</button>
        </Modal>
        <QuestionBar {...newProps} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const page = getCurrentQuestionPage(state);
  const allQuestions = getQuestions(state);
  const currentQuestions = allQuestions.slice(numberOfQs * page, (numberOfQs * page) + numberOfQs);

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
