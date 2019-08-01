import { UserError } from 'graphql-errors';
import publishRemovedBlockedNumber from '../../publications/removedBlockedNumber';
import publishUpdatedCalls from '../../publications/updatedCalls';
import {
  findRecentCalls,
  removeBlockedNumber,
  subscriberRelations,
  updateCalls,
} from '../../../db';

const unblockNumber = async (obj, { phoneNumber }, { subscriber }) => {
  const { _id: subscriberId } = subscriber;

  const unblockedNumber = await removeBlockedNumber({
    phoneNumber,
    subscriberId,
  });

  if (!unblockedNumber) {
    throw new UserError(`${phoneNumber} is not blocked`);
  }

  publishRemovedBlockedNumber(unblockedNumber);

  await updateCalls({ phoneNumber, subscriberId }, {
    $pull: {
      subscriberRelations: subscriberRelations.BLOCKED_NUMBER,
    },
  });

  const updatedCalls = await findRecentCalls({ phoneNumber, subscriberId });

  publishUpdatedCalls(updatedCalls);

  return unblockedNumber.phoneNumber === phoneNumber;
};

export default unblockNumber;
