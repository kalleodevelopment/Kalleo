import { UserError } from 'graphql-errors';
import publishRemovedFlaggedSpam from '../../publications/removedFlaggedSpam';
import publishUpdatedCalls from '../../publications/updatedCalls';
import {
  findRecentCalls,
  removeFlaggedSpam,
  subscriberRelations,
  updateCalls,
} from '../../../db';

const unflagSpam = async (obj, { phoneNumber }, { subscriber }) => {
  const { _id: subscriberId } = subscriber;

  const unflaggedSpam = await removeFlaggedSpam({
    phoneNumber,
    subscriberId,
  });

  if (!unflaggedSpam) {
    throw new UserError(`${phoneNumber} is not flagged as spam`);
  }

  publishRemovedFlaggedSpam(unflaggedSpam);

  await updateCalls({ phoneNumber, subscriberId }, {
    $pull: {
      subscriberRelations: subscriberRelations.FLAGGED_SPAM,
    },
  });

  const updatedCalls = await findRecentCalls({ phoneNumber, subscriberId });

  publishUpdatedCalls(updatedCalls);

  return unflaggedSpam.phoneNumber === phoneNumber;
};

export default unflagSpam;
