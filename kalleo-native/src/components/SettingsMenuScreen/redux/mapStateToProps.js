import getSubscriberIsDeactivated from '../../../helpers/getSubscriberIsDeactivated';

export default ({ subscriber }) => ({
  subscriberIsDeactivated: getSubscriberIsDeactivated(subscriber),
});
