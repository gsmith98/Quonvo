import { connect } from 'react-redux';
import { signIn } from 'actions';
import { SigninBar } from '../presentationalComponents';

export default connect(null, { signIn })(SigninBar); // TODO wrap in withRouter?
