import { updateAsRegisteredListing, listingTypes } from '../../db';
import { handleGraphqlError, to } from '../../logging';

const updateConsumerListing = async (obj, { input }, { user }) => {
  const { firstName, lastName, lineType } = input;
  const { phoneNumber } = user;

  const [error, updatedConsumer] = await to(updateAsRegisteredListing({
    phoneNumber,
  }, {
    lineType,
    type: listingTypes.CONSUMER,
    callerIdName: `${firstName} ${lastName}`,
    consumerDetails: {
      firstName,
      lastName,
    },
  }));

  handleGraphqlError(error, 'Failed to update consumer listing');

  return updatedConsumer;
};

export default updateConsumerListing;
