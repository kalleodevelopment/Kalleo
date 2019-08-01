import publishInsertedBlockedNumber from '../../publications/insertedBlockedNumber';
import publishUpdatedCalls from '../../publications/updatedCalls';
import {
  findRecentCalls,
  insertBlockedNumber,
  subscriberRelations,
  updateCalls,
} from '../../../db';

const blockNumber = async (obj, { input }, { subscriber }) => {
  const { callerIdName, phoneNumber } = input;
  const { _id: subscriberId } = subscriber;

  const blockedNumber = await insertBlockedNumber({
    callerIdName,
    phoneNumber,
    subscriberId,
  });

  await updateCalls({ phoneNumber, subscriberId }, {
    $addToSet: {
      subscriberRelations: subscriberRelations.BLOCKED_NUMBER,
    },
  });

  const updatedCalls = await findRecentCalls({ phoneNumber, subscriberId });

  publishUpdatedCalls(updatedCalls);
  publishInsertedBlockedNumber(blockedNumber);

  return blockedNumber;
};

export default blockNumber;
