import publishUpdatedSubscriber from '../../publications/updatedSubscriber';
import { getForwardingCode, sendText } from '../../../phone';
import { activationStatuses, updateSubscriber } from '../../../db';

// TODO: This is to handle older versions of the native app
const sendActivationText = async (obj, args, { subscriber }) => {
  const forwardingCode = await getForwardingCode(subscriber);

  await sendText(subscriber.phoneNumber, `tel://${forwardingCode}`);

  const updatedSubscriber = await updateSubscriber({
    _id: subscriber._id, // eslint-disable-line no-underscore-dangle
  }, {
    activationStatus: activationStatuses.TEXT_SENT,
  });

  publishUpdatedSubscriber(updatedSubscriber);

  return updatedSubscriber;
};

export default sendActivationText;
