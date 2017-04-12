import { connect } from 'react-redux';

import { newQuestionThunk } from 'actions';
import WriteQuestion from '../presentationalComponents/WriteQuestion';

export default connect(null, { onSubmitQuestion: newQuestionThunk })(WriteQuestion);
