import { connect } from 'react-redux';
import MessageBox from '../presentationalComponents/MessageBox';
// TODO actually make this component

const mapStateToProps = state => ({
  meessages: state.messages
});

export default connect(mapStateToProps, null)(MessageBox);
