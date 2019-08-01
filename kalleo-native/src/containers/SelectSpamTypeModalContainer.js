import { connect } from 'react-redux';
import { flagAsSpam } from '../redux/thunks/flagAsSpam';
import { updateIsModalVisible } from '../redux/actions/flagAsSpam';
import SelectSpamTypeModal from '../components/SelectSpamTypeModal';
import updateIsLoading from '../redux/actions/isLoading';

const mapStateToProps = ({ isLoading, flagAsSpam: { isModalVisible } }) => ({
  isModalVisible,
  isLoading,
});

const mapDispatchToState = dispatch => ({
  flagAsSpam: props => dispatch(flagAsSpam(props)),
  updateIsLoading: isLoading => dispatch(updateIsLoading(isLoading)),
  updateIsModalVisible: isModalVisible => dispatch(updateIsModalVisible(isModalVisible)),
});

export default connect(mapStateToProps, mapDispatchToState)(SelectSpamTypeModal);
