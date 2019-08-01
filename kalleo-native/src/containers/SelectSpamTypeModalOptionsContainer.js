import { connect } from 'react-redux';
import SelectSpamTypeModalOptions from '../components/SelectSpamTypeModalOptions';
import { updateSelectedSpamType } from '../redux/actions/flagAsSpam';

const mapStateToProps = ({ flagAsSpam: { selectedSpamType } }) => ({ selectedSpamType });

const mapDispatchToProps = dispatch => ({
  updateSelectedSpamType: selectedSpamType => dispatch(updateSelectedSpamType(selectedSpamType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectSpamTypeModalOptions);
