import publishUpdatedSubscriber from '../../publications/updatedSubscriber';
import { deactivationStatuses, updateSubscriber } from '../../../db';

const initiateDeactivationCall = async (obj, args, { subscriber }) => {
  const { _id } = subscriber;

  const updatedSubscriber = await updateSubscriber({
    _id,
  }, {
    deactivationStatus: deactivationStatuses.CALL_INITIATED,
  });

  publishUpdatedSubscriber(updatedSubscriber);

  return true;
};

export default initiateDeactivationCall;
