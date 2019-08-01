import { connect } from 'react-redux';
import OngoingCallHeader from '../components/OngoingCallHeader';
import { updateCallChronometer } from '../redux/actions/incomingCall';

const mapStateToProps = ({
  incomingCall: {
    callerId,
    time,
  },
}) => ({ callerId, time });

const mapDispatchToProps = dispatch => ({
  updateCallChronometer: time => dispatch(updateCallChronometer(time)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OngoingCallHeader);
