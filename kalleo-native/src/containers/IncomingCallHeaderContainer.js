import { connect } from 'react-redux';
import IncomingCallHeader from '../components/IncomingCallHeader';

const mapStateToProps = ({
  incomingCall: {
    callerId,
  },
}) => ({ callerId });

export default connect(mapStateToProps)(IncomingCallHeader);
