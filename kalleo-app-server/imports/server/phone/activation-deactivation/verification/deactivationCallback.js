import VoiceResponse from '../../twilio/twiml/VoiceResponse';
import { recordingUrls } from '../../../content';
import { publishUpdatedSubscriber } from '../../../graphql/publications';
import { handleError, to } from '../../../logging';
import {
  activationStatuses,
  deactivationStatuses,
  findSubscriber,
  updateSubscriber,
} from '../../../db';

const deactivationCallback = async (request, response) => {
  const { To: phoneNumber } = request.body;

  const subscriber = await findSubscriber({ phoneNumber });

  const { deactivationStatus } = subscriber;

  const deactivationVerified = deactivationStatus === deactivationStatuses.VERIFICATION_INITIATED;
  const voiceResponse = new VoiceResponse();

  if (deactivationVerified) {
    voiceResponse.play(recordingUrls.SUCCESSFULLY_DEACTIVATED);
  }

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.end(voiceResponse.toTwiml());

  if (deactivationVerified) {
    const { _id } = subscriber;

    const [updateError, updatedSubscriber] = await to(updateSubscriber({ _id }, {
      $set: {
        activationStatus: activationStatuses.UNSTARTED,
        deactivationStatus: deactivationStatuses.VERIFIED,
      },
    }));

    handleError(updateError, 'Failed to update account information');

    publishUpdatedSubscriber(updatedSubscriber);
  }
};

export default deactivationCallback;
