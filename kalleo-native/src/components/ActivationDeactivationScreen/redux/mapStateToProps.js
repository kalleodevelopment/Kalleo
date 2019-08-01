import getSubscriberIsDeactivated from '../../../helpers/getSubscriberIsDeactivated';

export default ({
  activeRoute,
  subscriber,
  verification: {
    showVerificationOverlay,
    verificationFailed,
  },
}) => {
  const { activationStatus, deactivationStatus } = subscriber;
  const subscriberIsDeactivated = getSubscriberIsDeactivated(subscriber);

  return {
    activationStatus,
    activeRoute,
    deactivationStatus,
    showVerificationOverlay,
    subscriberIsDeactivated,
    verificationFailed,
  };
};
