import { connect } from 'react-redux';
// import { getMessages } from 'reducers';
import { sendMessage } from 'actions';
import Chat from '../presentationalComponents/Chat';

// TODO get chatting partner out of state, map state to props
// const mapStateToProps = state => ({
//   messages: getMessages(state)
// });

export default connect(null, { sendMessage })(Chat);
