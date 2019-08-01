import actions from '../actions/types';

const initialState = {
  muteState: 0,
  speakerState: 0,
};

const onGoingCall = (state = initialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_MUTE_STATE:
      return {
        ...state,
        muteState: action.muteState,
      };
    case actions.TOGGLE_SPEAKER_STATE:
      return {
        ...state,
        speakerState: action.speakerState,
      };
    default:
      return state;
  }
};

export default onGoingCall;
