import { recordingUrls } from '../../../content';

const disconnectCall = voiceResponse => (
  voiceResponse
    .play(recordingUrls.UNABLE_TO_CONNECT_CALL)
    .hangup()
);

export default disconnectCall;
