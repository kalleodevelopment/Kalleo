import actions from './types';

const updateIncomingCallTwilioSid = twilioSid => ({
  twilioSid,
  type: actions.UPDATE_INCOMING_CALL_TWILIO_SID,
});

const updateIncomingCallStatus = status => ({
  status,
  type: actions.UPDATE_INCOMING_CALL_STATUS,
});

const updateIncomingCallCallerId = callerId => ({
  callerId,
  type: actions.UPDATE_INCOMING_CALL_CALLER_ID,
});

const updateCallChronometer = time => ({
  time,
  type: actions.UPDATE_CALL_CHRONOMETER,
});

export {
  updateIncomingCallTwilioSid,
  updateIncomingCallStatus,
  updateIncomingCallCallerId,
  updateCallChronometer,
};
