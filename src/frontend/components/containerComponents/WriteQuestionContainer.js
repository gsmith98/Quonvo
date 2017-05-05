import { connect } from 'react-redux';
import { getTopics } from 'reducers';
import { newQuestionThunk } from 'actions';
import WriteQuestion from '../presentationalComponents/WriteQuestion';

const mapStateToProps = (state, ownProps) => ({ topics: getTopics(state), ...ownProps });

export default connect(mapStateToProps, { onSubmitQuestion: newQuestionThunk })(WriteQuestion);
