import { connect } from 'react-redux';
import { getMessages } from 'reducers';
import MessagesBox from '../presentationalComponents/MessagesBox';


const mapStateToProps = state => ({
  messages: getMessages(state)
});

export default connect(mapStateToProps, null)(MessagesBox);
