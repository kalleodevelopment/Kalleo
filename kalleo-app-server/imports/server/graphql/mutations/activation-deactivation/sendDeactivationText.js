import publishUpdatedSubscriber from '../../publications/updatedSubscriber';
import { deactivationStatuses, updateSubscriber } from '../../../db';
import { handleGraphqlError, to } from '../../../logging';
import { getUnforwardingCode, sendText } from '../../../phone';

// TODO: This is to handle older versions of the native app
const sendDeactivationText = async (obj, args, { subscriber }) => {
  const [error, unforwardingCode] = await to(getUnforwardingCode(subscriber));

  handleGraphqlError(error, `Failed to get the subscribers unforwarding code ${subscriber.phoneNumber}`);

  await sendText(subscriber.phoneNumber, `tel://${encodeURIComponent(unforwardingCode)}`);

  const updatedSubscriber = await updateSubscriber({
    _id: subscriber._id, // eslint-disable-line no-underscore-dangle
  }, {
    deactivationStatus: deactivationStatuses.TEXT_SENT,
  });

  publishUpdatedSubscriber(updatedSubscriber);

  return updatedSubscriber;
};

export default sendDeactivationText;
