import { connect } from 'react-redux';
import MessagesBox from '../presentationalComponents/MessagesBox';

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, null)(MessagesBox);
