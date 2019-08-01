import subscription from './subscription';

export default authToken => ({
  document: subscription,
  variables: {
    authToken,
  },
  updateQuery: (prev, { subscriptionData }) => {
    if (!subscriptionData) {
      return prev;
    }

    const updatedSubscriber = subscriptionData.data.subscriberUpdated;

    return {
      subscriber: {
        ...prev,
        ...updatedSubscriber,
      },
    };
  },
  onError: () => {}, // Throw Rollbar or similar. The user doesn't need to see this.
});
