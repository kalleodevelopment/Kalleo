import publishInsertedFlaggedSpam from '../../publications/insertedFlaggedSpam';
import publishUpdatedCalls from '../../publications/updatedCalls';
import {
  findRecentCalls,
  insertFlaggedSpam,
  subscriberRelations,
  updateCalls,
} from '../../../db';

const flagSpam = async (obj, { input }, { subscriber }) => {
  const { callerIdName, phoneNumber, type } = input;
  const { _id: subscriberId } = subscriber;

  const flaggedSpam = await insertFlaggedSpam({
    callerIdName,
    phoneNumber,
    subscriberId,
    type,
  });

  await updateCalls({ phoneNumber, subscriberId }, {
    $addToSet: {
      subscriberRelations: subscriberRelations.FLAGGED_SPAM,
    },
  });

  const updatedCalls = await findRecentCalls({ phoneNumber, subscriberId });

  publishUpdatedCalls(updatedCalls);
  publishInsertedFlaggedSpam(flaggedSpam);

  return flaggedSpam;
};

export default flagSpam;
