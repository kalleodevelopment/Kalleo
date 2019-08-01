import {
  accountStatuses,
  activationStatuses,
  deactivationStatuses,
  updateSubscriber,
} from '../../../db';
import { publishUpdatedSubscriber } from '../../../graphql/publications';
import { handleError, to } from '../../../logging';

const handleVerificationCall = async (subscriber) => {
  const { _id, activationStatus, deactivationStatus } = subscriber;

  let error;
  let updatedSubscriber;

  if (activationStatus === activationStatuses.VERIFICATION_INITIATED) {
    [error, updatedSubscriber] = await to(updateSubscriber({ _id }, {
      accountStatus: accountStatuses.ACTIVE,
      activationStatus: activationStatuses.VERIFIED,
      deactivationStatus: deactivationStatuses.UNSTARTED,
    }));

    handleError(error, 'Failed to update subscriber activation status');
  } else if (deactivationStatus === deactivationStatuses.VERIFICATION_INITIATED) {
    [error, updatedSubscriber] = await to(updateSubscriber({ _id }, {
      deactivationStatus: deactivationStatuses.FAILED,
    }));

    handleError(error, 'Failed to update subscriber deactivation status');
  }

  if (updatedSubscriber) {
    publishUpdatedSubscriber(updatedSubscriber);
  }
};

export default handleVerificationCall;
