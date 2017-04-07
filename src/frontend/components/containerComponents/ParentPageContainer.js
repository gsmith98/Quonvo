import { connect } from 'react-redux';
import { getChatOpen } from 'reducers';
import ParentPage from '../presentationalComponents/ParentPage';

const mapStateToProps = state => ({
  chatopen: getChatOpen(state)
});

export default connect(mapStateToProps, null)(ParentPage);
