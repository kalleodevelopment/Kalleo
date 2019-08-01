import VoiceResponse from '../../twilio/twiml/VoiceResponse';
import { recordingUrls } from '../../../content';
import { activationStatuses, findSubscriber, updateSubscriber } from '../../../db';
import { publishUpdatedSubscriber } from '../../../graphql/publications';

const activationCallback = async (request, response) => {
  const { To: phoneNumber } = request.body;

  const { _id, activationStatus } = await findSubscriber({ phoneNumber });

  const activationFailed = activationStatus !== activationStatuses.VERIFIED;
  const voiceResponse = new VoiceResponse();

  if (activationFailed) {
    voiceResponse.play(recordingUrls.VERIFICATION_FAILED);
  }

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(voiceResponse.toTwiml());

  if (activationFailed) {
    const updatedSubscriber = await updateSubscriber({
      _id,
    }, {
      activationStatus: activationStatuses.FAILED,
    });

    publishUpdatedSubscriber(updatedSubscriber);
  }
};

export default activationCallback;
