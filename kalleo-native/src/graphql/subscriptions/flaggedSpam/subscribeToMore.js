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

    const { mutation, payload } = subscriptionData.data.flaggedSpam;

    let { flaggedSpam = [] } = prev;

    switch (mutation) {
      case mutationTypes.REMOVED:
        // eslint-disable-next-line no-underscore-dangle
        flaggedSpam = prev.flaggedSpam.filter(f => f._id !== payload._id);
        break;
      case mutationTypes.INSERTED:
        flaggedSpam = [payload, ...flaggedSpam];
        break;
      default:
        break;
    }

    return { flaggedSpam };
  },
  onError: () => {}, // Throw Rollbar or similar. The user doesn't need to see this.
});
