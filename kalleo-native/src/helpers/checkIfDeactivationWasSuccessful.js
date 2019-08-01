import { activationStatuses, deactivationStatuses } from '../constants/statuses';

export default (prevProps, props) => {
  if (
    (prevProps.activationStatus === activationStatuses.VERIFIED
      && prevProps.deactivationStatus === deactivationStatuses.VERIFICATION_INITIATED)
    && (props.activationStatus === activationStatuses.UNSTARTED
      && props.deactivationStatus === deactivationStatuses.VERIFIED)
  ) {
    return true;
  }

  return false;
};
