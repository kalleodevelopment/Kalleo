import findBlockedNumber from './findBlockedNumber';
import findContact from './findContact';
import findFlaggedSpam from './findFlaggedSpam';
import subscriberRelations from '../constants/subscriberRelations';

const findSubscriberRelations = async ({ subscriberId, phoneNumber }) => {
  const foundRelations = [];

  if (await findBlockedNumber({ subscriberId, phoneNumber })) {
    foundRelations.push(subscriberRelations.BLOCKED_NUMBER);
  }

  if (await findContact({ subscriberId, phoneNumber })) {
    foundRelations.push(subscriberRelations.CONTACT);
  }

  if (await findFlaggedSpam({ subscriberId, phoneNumber })) {
    foundRelations.push(subscriberRelations.FLAGGED_SPAM);
  }

  return foundRelations;
};

export default findSubscriberRelations;
