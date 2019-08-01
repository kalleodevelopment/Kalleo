import getSubscriberIsDeactivated from '../../../helpers/getSubscriberIsDeactivated';

export default ({ activeRoute, subscriber }) => ({
  activeRoute,
  subscriberIsDeactivated: getSubscriberIsDeactivated(subscriber),
});
