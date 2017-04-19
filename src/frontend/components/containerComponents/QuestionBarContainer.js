import { connect } from 'react-redux';
// import { getMessages } from 'reducers';
import { onQuestionClick } from 'actions/chatActions';
import { loadMoreQuestionsThunk as loadMoreQuestions } from 'actions';
import QuestionBar from '../presentationalComponents/QuestionBar';


const dummyQuestions = [
  { id: 0, content: 'When calculating cash flows which accounts go into investments?', subject: 'Accounting' },
  { id: 1, content: 'Can soneone explain what the long tail of the market is?', subject: 'TOM' },
  { id: 2, content: 'Whats the difference bwteeen r and r^2?', subject: 'QTM' },
  { id: 3, content: 'Can someone explain to me what we need to know for leadership styles?', subject: 'FME' },
  { id: 4, content: 'Which accounts change when I spend prepaid advertising?', subject: 'Accounting' },
  { id: 5, content: 'Will my landlord kill me?', subject: 'suspiciously cheap rent' },
  { id: 6, content: 'How do you pronounce the word BAGEL?', subject: 'canadians' }
];

const mapStateToProps = (/* state */) => ({
  listOfQuestions: dummyQuestions // TODO write a selector for this
});

export default connect(mapStateToProps, { onQuestionClick, loadMoreQuestions })(QuestionBar);
