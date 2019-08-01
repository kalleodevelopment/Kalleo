import { accountStatuses, activationStatuses, deactivationStatuses } from '../constants/statuses';

export default ({ activationStatus, deactivationStatus, accountStatus }) => {
  if (accountStatus === accountStatuses.INCOMPLETE) {
    return true;
  }

  return (activationStatus !== activationStatuses.VERIFIED) &&
      (deactivationStatus === deactivationStatuses.VERIFIED);
};
