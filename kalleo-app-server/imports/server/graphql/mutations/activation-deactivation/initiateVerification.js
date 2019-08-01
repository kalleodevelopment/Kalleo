import publishUpdatedSubscriber from '../../publications/updatedSubscriber';
import { ROOT_URL, TWILIO_VERIFICATION_PHONE_NUMBER, VERIFICATION_TIMEOUT_MS } from '../../../config';
import { updateSubscriber } from '../../../db';
import { handleGraphqlError, to } from '../../../logging';
import { createCall, getSubscriberStatusByType, routePaths } from '../../../phone';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const initiateVerification = async (obj, { type }, { subscriber }) => {
  const { statusToUpdate, statuses } = getSubscriberStatusByType(subscriber, type);

  let [error, updatedSubscriber] = await to(updateSubscriber({
    _id: subscriber._id, // eslint-disable-line no-underscore-dangle
  }, {
    [statusToUpdate]: statuses.VERIFICATION_INITIATED,
  }));

  // Set delay of 3 seconds before firing Twilio verification call
  await delay(VERIFICATION_TIMEOUT_MS);

  const [twilioError] = await to(createCall({
    from: TWILIO_VERIFICATION_PHONE_NUMBER,
    to: subscriber.phoneNumber,
    url: `${ROOT_URL}${routePaths[type]}`, // "ACTIVATION" or "DEACTIVATION"
  }));

  if (twilioError) {
    [error, updatedSubscriber] = await to(updateSubscriber({
      _id: subscriber._id, // eslint-disable-line no-underscore-dangle
    }, {
      [statusToUpdate]: statuses.FAILED,
    }));
  }

  publishUpdatedSubscriber(updatedSubscriber);

  handleGraphqlError(error, 'Failed to update subscriber information');

  return true;
};

export default initiateVerification;
