import actions from '../actions/types';

const initialState = {
  twilioSid: null,
  callerId: null,
  status: null,
  time: 0,
};

const phone = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_INCOMING_CALL_TWILIO_SID:
      return {
        ...state,
        twilioSid: action.twilioSid,
      };
    case actions.UPDATE_INCOMING_CALL_CALLER_ID:
      return {
        ...state,
        callerId: action.callerId,
      };
    case actions.UPDATE_INCOMING_CALL_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case actions.UPDATE_CALL_CHRONOMETER: {
      if (action.time !== 0) {
        const time = state.time + 1;
        return {
          ...state,
          time,
        };
      }
      return {
        ...state,
        time: action.time,
      };
    }
    default:
      return state;
  }
};

export default phone;
