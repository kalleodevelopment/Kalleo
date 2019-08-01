import sendText from '../twilio/sendText';
import VoiceResponse from '../twilio/twiml/VoiceResponse';
import { textMessages, recordingUrls } from '../../content';
import { callStatuses, updateCall } from '../../db';
import twilioCallStatuses from '../twilio/constants';
import { publishInsertedCall } from '../../graphql/publications';
import { logError } from '../../logging';
import isMobileLineType from '../helpers/isMobileLineType';

const handleDialCallStatus = async (request, response) => {
  const { DialCallStatus } = request.body;
  const {
    callerIdName,
    callId,
    callerIsRegistered,
    subscriberId,
  } = request.query;

  const voiceResponse = new VoiceResponse();

  let status;

  switch (DialCallStatus) {
    case twilioCallStatuses.ANSWERED:
    case twilioCallStatuses.COMPLETED:
      status = callStatuses.ANSWERED;
      voiceResponse.hangup();
      break;
    case twilioCallStatuses.BUSY:
    case twilioCallStatuses.NO_ANSWER:
      status = callStatuses.MISSED;
      voiceResponse.recordVoicemail({
        subscriberId,
        voicemailMessage: recordingUrls.VOICEMAIL,
      });
      break;
    case twilioCallStatuses.CANCELED:
    case twilioCallStatuses.FAILED:
    default:
      status = callStatuses.FAILED;
      voiceResponse.hangup();
      break;
  }

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(voiceResponse.toTwiml());

  try {
    if (callId) {
      const completedCall = await updateCall({
        _id: callId,
      }, {
        status,
      });

      publishInsertedCall(completedCall);

      const { lineType } = completedCall;

      if ((isMobileLineType(lineType)) && (callerIsRegistered === 'false')) {
        sendText(completedCall.phoneNumber, textMessages.UNREGISTERED_CALL(callerIdName));
      }
    }
  } catch (error) {
    logError({ error, request });
  }
};

export default handleDialCallStatus;
