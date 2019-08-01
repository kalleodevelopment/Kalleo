import updateListing from './updateListing';
import listingTypes from '../constants/listingTypes';
import findListing from '../queries/findListing';
import { AppError } from '../../logging';

const updateAsRegisteredListing = async ({ phoneNumber }, update) => {
  const listing = await findListing({ phoneNumber });

  if (!listing) {
    throw new AppError(`No listing found for ${phoneNumber}`);
  }

  let modifiedUpdate;

  switch (listing.type) {
    case listingTypes.SPAM:
      throw new AppError('No editing or registration allowed for spam listings');
    case listingTypes.SUBSCRIBER: {
      // TODO: Subscriber and consumer details are currently identical.
      // Ideally we should have a better method for handling these differentiations.
      // We might consider getting rid of subscriber details.
      const details = update.subscriberDetails || update.consumerDetails;

      modifiedUpdate = {
        callerIdName: update.callerIdName,
        consumerDetails: details,
        subscriberDetails: details,
      };
      break;
    }
    default:
      modifiedUpdate = update;
      break;
  }

  const updatedRegisteredFields = listing.isRegistered
    ? {}
    : {
      isRegistered: true,
      registeredAt: new Date().toISOString(),
    };

  const updatedListing = await updateListing({ phoneNumber }, {
    ...modifiedUpdate,
    ...updatedRegisteredFields,
  });

  return updatedListing;
};

export default updateAsRegisteredListing;
