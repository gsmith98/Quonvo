import { connect } from 'react-redux';
// import { getMessages } from 'reducers';
import { onQuestionClick } from 'actions';
import QuestionBar from '../presentationalComponents/QuestionBar';


const dummyQuestions = [
  { id: 0, content: 'Help me!', subject: 'advice' },
  { id: 1, content: 'Where can I rest my laurels?', subject: 'laurel-resting' },
  { id: 2, content: 'How much wood would Chuck have if Chuck didn\'t have ED?', subject: 'woodchucks' }
];

const mapStateToProps = (/* state */) => ({
  listOfQuestions: dummyQuestions
});

export default connect(mapStateToProps, { onQuestionClick })(QuestionBar);
