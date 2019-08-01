import actions from './types';

const toggleMuteState = muteState => ({
  muteState,
  type: actions.TOGGLE_MUTE_STATE,
});

const toggleSpeakerState = speakerState => ({
  speakerState,
  type: actions.TOGGLE_SPEAKER_STATE,
});

export {
  toggleMuteState,
  toggleSpeakerState,
};
