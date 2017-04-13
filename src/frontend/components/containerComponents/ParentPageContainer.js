import { connect } from 'react-redux';
import { getChats } from 'reducers/chatsReducer';
import ParentPage from '../presentationalComponents/ParentPage';

const mapStateToProps = state => ({
  chats: getChats(state)
});

export default connect(mapStateToProps, null)(ParentPage);
