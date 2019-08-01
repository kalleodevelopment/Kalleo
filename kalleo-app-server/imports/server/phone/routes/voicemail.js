import sendText from '../twilio/sendText';
import { hangup } from '../twilio/twiml/VoiceResponse';
import { lookup } from '../../community';
import { textMessages } from '../../content';
import { findSubscriber } from '../../db';
import { logError, logMessage, to } from '../../logging';

const handleVoicemail = async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(hangup());

  const {
    Caller: caller,
    RecordingUrl: recordingUrl,
  } = request.body;

  const { subscriberId } = request.query;

  if (!subscriberId) {
    logMessage({ message: `No subscriber information available, skipping voicemail text message for call ${recordingUrl}.` });
  } else {
    try {
      const subscriber = await findSubscriber({
        _id: subscriberId,
      });

      if (!subscriber) {
        throw new Error(`No subscriber information found for ID: ${subscriberId}`);
      }

      const [lookupError, listing] = await to(lookup(caller));

      const callerIdName = lookupError ? caller : (listing.callerIdName || caller);
      const message = textMessages.RECEIVED_VOICEMAIL({ callerIdName, recordingUrl });

      await sendText(subscriber.phoneNumber, message);
    } catch (error) {
      logError({ error, request });
    }
  }
};

export default handleVoicemail;
