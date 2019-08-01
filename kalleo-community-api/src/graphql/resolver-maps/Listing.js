import { findCarrierById } from '../../carriers';

const carrier = async (listing) => {
  const {
    id,
    everyoneApiName,
  } = listing.carrier || {};

  // TODO: These individual requests could get slow when returning multiple listings (n + 1 issue)
  // Consider normalizing data and doing a custom join for those queries
  const foundCarrier = await findCarrierById(id);

  return foundCarrier || { everyoneApiName };
};

export const PublicListing = {
  carrier,
};

export const SubscriberListing = {
  carrier,
  firstName: ({ subscriberDetails = {} }) => subscriberDetails.firstName,
  lastName: ({ subscriberDetails = {} }) => subscriberDetails.lastName,
};
