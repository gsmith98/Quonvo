import { connect } from 'react-redux';
// import { getMessages } from 'reducers';
import { onQuestionClick } from 'actions/chatActions';
import { getQuestions } from 'reducers';
import { loadMoreQuestionsThunk as loadMoreQuestions } from 'actions';
import QuestionBar from '../presentationalComponents/QuestionBar';


const mapStateToProps = state => ({
  listOfQuestions: getQuestions(state)
});

export default connect(mapStateToProps, { onQuestionClick, loadMoreQuestions })(QuestionBar);
