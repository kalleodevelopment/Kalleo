import { NativeEventEmitter, NativeModules } from 'react-native';
import {
  updateIncomingCallTwilioSid,
  updateIncomingCallStatus,
  updateIncomingCallCallerId,
  updateCallChronometer,
} from '../redux/actions/incomingCall';
import incomingCall from '../constants/incomingCall';

const configureIncomingCall = ({ dispatch }) => {
  const eventEmitter = new NativeEventEmitter(NativeModules.KalleoBridge);

  eventEmitter.addListener(incomingCall.IncomingCall, ({ callerId, twilioSid }) => {
    dispatch(updateIncomingCallCallerId(callerId));
    dispatch(updateIncomingCallTwilioSid(twilioSid));
    dispatch(updateIncomingCallStatus(incomingCall.INCOMING_CALL_PENDING));
  });

  eventEmitter.addListener(incomingCall.Connected, ({ callerId }) => {
    dispatch(updateIncomingCallCallerId(callerId));
    dispatch(updateIncomingCallStatus(incomingCall.INCOMING_CALL_ANSWERED));
    dispatch(updateCallChronometer());
  });

  eventEmitter.addListener(incomingCall.Disconnected, () => {
    dispatch(updateIncomingCallTwilioSid(null));
    dispatch(updateIncomingCallStatus(null));
    dispatch(updateIncomingCallCallerId(null));
    dispatch(updateCallChronometer(0));
  });
};

export default configureIncomingCall;
