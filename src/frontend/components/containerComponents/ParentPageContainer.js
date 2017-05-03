import { connect } from 'react-redux';
import { getChats, areArchivesOpen } from 'reducers';
import { ParentPage } from '../presentationalComponents';

const mapStateToProps = state => ({
  // map from dict of chats objects to array of chatObjects which now include their dict key
  chats: Object.keys(getChats(state))
          .map(key => Object.assign({}, getChats(state)[key], { chatIndex: key })),
  archives: areArchivesOpen(state)
});

export default connect(mapStateToProps, null)(ParentPage);
