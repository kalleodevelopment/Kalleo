import { callStatuses, updateCall } from '../../../db';
import VoiceResponse from '../../twilio/twiml/VoiceResponse';
import disconnectCall from './disconnectCall';

const gatherPhoneNumberTimeout = async (request, response) => {
  const { callId } = request.query;

  const voiceResponse = new VoiceResponse();

  disconnectCall(voiceResponse);

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(voiceResponse.toTwiml());

  await updateCall({ _id: callId }, {
    status: callStatuses.ORPHANED,
  });
};

export default gatherPhoneNumberTimeout;
