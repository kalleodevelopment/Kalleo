import lookup from './lookup';
import sendAuthCode from './sendAuthCode';
import verifyAuthCode from './verifyAuthCode';
import subscriberLookup from './subscriberLookup';
import updateBusinessListing from './updateBusinessListing';
import updateConsumerListing from './updateConsumerListing';
import updateSubscriberListing from './updateSubscriberListing';
import guardUser from '../helpers/guardUser';

export const appMutations = {
  lookup,
  subscriberLookup,
  updateSubscriberListing,
};

export const publicMutations = {
  lookup,
  sendAuthCode,
  verifyAuthCode,
  updateBusinessListing: guardUser(updateBusinessListing),
  updateConsumerListing: guardUser(updateConsumerListing),
};
