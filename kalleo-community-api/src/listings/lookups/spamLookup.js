import toSpamDetails from '../mappers/toSpamDetails';
import reputationLookup from './twilio/reputationLookup';
import verifyNumberIsSpam from '../helpers/verifyNumberIsSpam';
import { listingTypes } from '../../db';
import { logMessage } from '../../logging';

const spamLookup = async (phoneNumber) => {
  logMessage({ message: 'graphql (spamLookup): Spam Lookup' });

  const reputation = await reputationLookup(phoneNumber);

  logMessage({ message: 'graphql (spamLookup): Lookup Completed' });

  console.log('reputation: ', reputation);

  if (!verifyNumberIsSpam(reputation)) {
    return null;
  }

  const spamListing = {
    ...toSpamDetails(reputation),
    phoneNumber,
    type: listingTypes.SPAM,
  };

  return spamListing;
};

export default spamLookup;
