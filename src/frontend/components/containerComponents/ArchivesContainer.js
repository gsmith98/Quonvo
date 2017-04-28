import { connect } from 'react-redux';
import { getMyArchives } from 'reducers';
import { newArchivesThunk, closeArchives } from 'actions';
import Archives from '../presentationalComponents/Archives';

const mapStateToProps = state => ({
  archives: getMyArchives(state)
});

export default connect(mapStateToProps, { newArchivesThunk, closeArchives })(Archives);
