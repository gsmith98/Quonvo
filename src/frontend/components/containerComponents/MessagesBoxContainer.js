import { connect } from 'react-redux';
import { getMessages } from 'reducers';
import MessagesBox from '../presentationalComponents/MessagesBox';


const mapStateToProps = (state, { chatIndex }) => ({
  messages: getMessages(state, chatIndex)
});

export default connect(mapStateToProps, null)(MessagesBox);
