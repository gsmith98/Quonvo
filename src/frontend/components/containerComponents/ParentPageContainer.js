import { connect } from 'react-redux';
import { getChats } from 'reducers';
import ParentPage from '../presentationalComponents/ParentPage';

const mapStateToProps = state => ({
  chats: Object.values(getChats(state)) // NOTE ES2017, not widely supported yet (4/25/17)
});

export default connect(mapStateToProps, null)(ParentPage);
