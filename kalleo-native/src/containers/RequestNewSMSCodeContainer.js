import { connect } from 'react-redux';
import RequestNewSMSCode from '../components/RequestNewSMSCode';
import { resetAuthVerificationCode } from '../redux/actions/auth';

const mapPropsToState = ({ auth: { phoneNumber } }) => ({ phoneNumber });

const mapDispatchToProps = dispatch => ({
  resetCode: () => dispatch(resetAuthVerificationCode()),
});

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(RequestNewSMSCode);
