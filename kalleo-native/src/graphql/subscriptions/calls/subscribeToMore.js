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

    const { mutation, payload } = subscriptionData.data.calls;

    let { recentCalls } = prev;

    switch (mutation) {
      case mutationTypes.INSERTED:
        recentCalls = [...payload, ...recentCalls];
        break;
      case mutationTypes.UPDATED: {
        payload.forEach((updatedCall) => {
          const index = recentCalls.findIndex(recentCall => (
            // eslint-disable-next-line no-underscore-dangle
            updatedCall._id === recentCall._id
          ));

          if (index !== -1) {
            recentCalls[index] = updatedCall;
          } else {
            recentCalls = [updatedCall, ...recentCalls];
          }
        });

        break;
      }

      default: break;
    }

    return {
      recentCalls,
    };
  },
  onError: () => {},
});
