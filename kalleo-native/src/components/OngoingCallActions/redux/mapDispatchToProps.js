import {
  toggleMuteState,
  toggleSpeakerState,
} from '../../../redux/actions/onGoingCall';

export default dispatch => ({
  toggleMuteState: status => (
    dispatch(toggleMuteState(status))
  ),
  toggleSpeakerState: status => (
    dispatch(toggleSpeakerState(status))
  ),
});
