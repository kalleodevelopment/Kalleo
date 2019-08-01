import { callStatuses, insertCall } from '../../../db';
import VoiceResponse from '../../twilio/twiml/VoiceResponse';
import { recordingUrls } from '../../../content';

const gatherSubscriberPhoneNumber = async (call) => {
  const { _id: callId } = await insertCall({
    ...call,
    status: callStatuses.GATHER_PHONE_NUMBER,
  });

  const voiceResponse = new VoiceResponse();

  return voiceResponse
    .play(recordingUrls.GATHER_PHONE_NUMBER)
    .play(recordingUrls.GATHER_BEEP)
    .gather({ callId })
    .toTwiml();
};

export default gatherSubscriberPhoneNumber;
