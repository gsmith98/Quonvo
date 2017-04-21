import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onQuestionClick } from 'actions/chatActions';
import { getQuestions, getCurrentQuestionPage, getYourQuestion } from 'reducers';
import { loadMoreQuestionsThunk as loadMoreQuestions, nextQuestionPage, previousQuestionPage, firstQuestionPage } from 'actions';
import { QuestionBar, Modal } from '../presentationalComponents';

const limit = 1000;
const questionRefresh = 10000;
const numberOfQs = 5;
const howEarlyShouldWeLoad = 2;

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
    if (this.props.listOfQuestions.length === 0) {
      console.log('i got here');
      this.props.firstQuestionPage();
    }
    const questions = this.props.allQuestions;
    console.log(questions);
    const page = this.props.currentPage;
    let mostRecent = 0;
    for (let i = 0; i < questions.length; i++) {
      const date = questions[i].createdTime;
      if (date > mostRecent) mostRecent = date;
    }
    console.log(mostRecent, 'I GOT HERE');

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
    // TODO send chosenHandle to question asker (add to onQuestionClick thunk)
    console.log(chosenHandle);

    this.props.onQuestionClick(this.state.clickedQid, this.state.clickedQhandle);
    this.closeModal();
  }

  openModal(id, handle) {
    this.setState({ answerModalActive: true, clickedQid: id, clickedQhandle: handle });
  }

  closeModal() {
    this.setState({ answerModalActive: false, clickedQid: null, clickedQhandle: null });
  }

  render() {
    const newProps = Object.assign(
      {},
      this.props,
      { onQuestionClick: () => this.closeModal(),
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
