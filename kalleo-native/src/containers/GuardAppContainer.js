import { connect } from 'react-redux';
import GuardApp from '../components/GuardApp';
import verifySubscriber from '../redux/thunks/guard';

const mapStateToProps = ({
  auth: {
    isAuthenticated,
    verifiedAuthentication,
  },
}) => ({
  isAuthenticated,
  verifiedAuthentication,
});

const mapDispatchToProps = dispatch => ({
  verifySubscriber: () => dispatch(verifySubscriber()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GuardApp);
