import { callStatuses, findSubscriber, updateCall } from '../../../db';
import { publishUpdatedCall } from '../../../graphql/publications';
import { recordingUrls } from '../../../content';
import VoiceResponse from '../../twilio/twiml/VoiceResponse';
import disconnectCall from './disconnectCall';

const gatherPhoneNumber = async (request, response) => {
  const { Digits: digits } = request.body;
  const { callId } = request.query;

  const voiceResponse = new VoiceResponse();

  let callDocUpdates = {
    status: callStatuses.ORPHANED,
  };

  const subscriber = await findSubscriber({ phoneNumber: `+1${digits}` });

  if (!subscriber) {
    disconnectCall(voiceResponse);
  } else {
    const { _id: subscriberId } = subscriber;

    callDocUpdates = {
      ...callDocUpdates,
      subscriberId,
      status: callStatuses.DIRECT_TO_VOICEMAIL,
    };

    voiceResponse
      .play(recordingUrls.CHIME)
      .recordVoicemail({
        subscriberId,
        voicemailMessage: recordingUrls.VOICEMAIL,
      });
  }

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(voiceResponse.toTwiml());

  const updatedCall = await updateCall({ _id: callId }, callDocUpdates);

  if (updatedCall.status !== callStatuses.ORPHANED) {
    publishUpdatedCall(updatedCall);
  }
};

export default gatherPhoneNumber;
