import { connect } from 'react-redux';
import { openSelectSpamTypeModal } from '../redux/thunks/flagAsSpam';
import FlagSpamCallerButton from '../components/FlagSpamCallerButton';

const mapStateToProps = ({ flagAsSpam: { isModalVisible } }) => ({
  isModalVisible,
});

const mapDispatchToState = dispatch => ({
  openSelectSpamTypeModal: props => dispatch(openSelectSpamTypeModal(props)),
});

export default connect(mapStateToProps, mapDispatchToState)(FlagSpamCallerButton);
