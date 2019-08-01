import VoiceResponse from '../../twilio/twiml/VoiceResponse';
import { recordingUrls } from '../../../content';
import { callStatuses, listingTypes } from '../../../db';

const respondToIdentifiedCaller = ({ callDoc, identifiedCaller }) => {
  const {
    _id: callId,
    status,
    subscriberId,
  } = callDoc;

  const {
    callerIdName,
    listingType,
    phoneNumber,
    isRegistered: callerIsRegistered,
  } = identifiedCaller;

  const voiceResponse = new VoiceResponse();

  switch (status) {
    case callStatuses.DIALED:
      if (!callerIsRegistered) {
        voiceResponse
          .play(recordingUrls.CHIME)
          .play(recordingUrls.CONNECTING_CALL_UNREGISTERED)
          .say(callerIdName);
      }

      voiceResponse.dialClient({
        callId,
        callerIdName,
        callerIsRegistered,
        phoneNumber,
        subscriberId,
      });
      break;
    case callStatuses.DIRECT_TO_VOICEMAIL:
      voiceResponse
        .play(recordingUrls.CHIME)
        .recordVoicemail({
          subscriberId,
          voicemailMessage: recordingUrls.UNIDENTIFIED,
        });
      break;
    case callStatuses.BLOCKED:
      if (listingType === listingTypes.SPAM) {
        voiceResponse
          .play(recordingUrls.CHIME)
          .play(recordingUrls.SPAM);
      } else {
        voiceResponse.reject();
      }
      break;
    default:
      break;
  }

  return voiceResponse.toTwiml();
};

export default respondToIdentifiedCaller;
