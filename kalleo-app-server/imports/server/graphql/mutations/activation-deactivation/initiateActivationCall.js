import publishUpdatedSubscriber from '../../publications/updatedSubscriber';
import { activationStatuses, updateSubscriber } from '../../../db';

const initiateActivationCall = async (obj, args, { subscriber }) => {
  const updatedSubscriber = await updateSubscriber({
    _id: subscriber._id, // eslint-disable-line no-underscore-dangle
  }, {
    activationStatus: activationStatuses.CALL_INITIATED,
  });

  publishUpdatedSubscriber(updatedSubscriber);

  return true;
};

export default initiateActivationCall;
