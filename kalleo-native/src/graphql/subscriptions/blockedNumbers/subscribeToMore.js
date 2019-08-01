import subscription from './subscription';
import mutationTypes from '../../../constants/mutationTypes';

export default authToken => ({
  document: subscription,
  variables: {
    authToken,
  },
  updateQuery: (prev, { subscriptionData }) => {
    if (!subscriptionData) {
      return prev;
    }

    const { mutation, payload } = subscriptionData.data.blockedNumbers;

    let { blockedNumbers = [] } = prev;

    switch (mutation) {
      case mutationTypes.REMOVED:
        // eslint-disable-next-line no-underscore-dangle
        blockedNumbers = prev.blockedNumbers.filter(b => b._id !== payload._id);
        break;
      case mutationTypes.INSERTED:
        blockedNumbers = [payload, ...blockedNumbers];
        break;
      default:
        break;
    }

    return { blockedNumbers };
  },
  onError: () => {}, // Throw Rollbar or similar. The user doesn't need to see this.
});
