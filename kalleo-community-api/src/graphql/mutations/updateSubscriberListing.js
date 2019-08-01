import { updateAsRegisteredListing, listingTypes } from '../../db';
import { handleGraphqlError, to } from '../../logging';

const updateSubscriberListing = async (obj, { input }) => {
  const { phoneNumber, firstName, lastName } = input;

  const [error, updatedSubscriber] = await to(updateAsRegisteredListing({
    phoneNumber,
  }, {
    type: listingTypes.SUBSCRIBER,
    callerIdName: `${firstName} ${lastName}`,
    consumerDetails: {
      firstName,
      lastName,
    },
    subscriberDetails: {
      firstName,
      lastName,
    },
  }));

  handleGraphqlError(error, 'Failed to update subscriber details');

  return updatedSubscriber;
};

export default updateSubscriberListing;
