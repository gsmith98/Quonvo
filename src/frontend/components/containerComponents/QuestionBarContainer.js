import { connect } from 'react-redux';
// import { getMessages } from 'reducers';
import { onQuestionClick } from 'actions/chatActions';
import QuestionBar from '../presentationalComponents/QuestionBar';


// const dummyQuestions = [
//   { id: 0, content: 'Help me!', subject: 'advice' },
//   { id: 1, content: 'Where can I rest my laurels?', subject: 'laurel-resting' },
//   { id: 2, content:
// 'How much wood would Chuck have if Chuck didn\'t have ED?', subject: 'woodchucks' },
//   { id: 3, content: 'Which soylent should Mitchell drink today?', subject: 'soylent' },
//   { id: 4, content: 'Whose birthday is it today?', subject: 'doodles' },
//   { id: 5, content: 'Will my landlord kill me?', subject: 'suspiciously cheap rent' },
//   { id: 6, content: 'How do you pronounce the word BAGEL?', subject: 'canadians' }
// ];

const mapStateToProps = state => ({
  listOfQuestions: state.questions
});

export default connect(mapStateToProps, { onQuestionClick })(QuestionBar);
