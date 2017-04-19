import { connect } from 'react-redux';

import { newQuestionThunk } from 'actions';
import WriteQuestion from '../presentationalComponents/WriteQuestion';

const mapStateToProps = (state, ownProps) => ({ ...ownProps });

export default connect(mapStateToProps, { onSubmitQuestion: newQuestionThunk })(WriteQuestion);
