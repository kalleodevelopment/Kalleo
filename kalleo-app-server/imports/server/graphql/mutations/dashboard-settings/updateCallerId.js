import publishUpdatedSubscriber from '../../publications/updatedSubscriber';
import { updateSubscriberListing } from '../../../community';
import { TEST_SUBSCRIBER_PHONE_NUMBER } from '../../../config';
import { accountStatuses, onboardStatuses, updateSubscriber } from '../../../db';

const updateCallerId = async (obj, { input }, { subscriber }) => {
  const { firstName, lastName, email } = input;
  const { phoneNumber } = subscriber;

  const updatedOnboardStatus = subscriber.accountStatus === accountStatuses.INCOMPLETE
    ? {
      onboardStatus: onboardStatuses.COMPLETED,
    }
    : {};

  const updatedSubscriber = await updateSubscriber({
    _id: subscriber._id, // eslint-disable-line no-underscore-dangle
  }, {
    firstName,
    lastName,
    email,
    ...updatedOnboardStatus,
  });

  if (phoneNumber !== TEST_SUBSCRIBER_PHONE_NUMBER) {
    await updateSubscriberListing({
      firstName,
      lastName,
      phoneNumber,
    });
  }

  publishUpdatedSubscriber(updatedSubscriber);

  return updatedSubscriber;
};

export default updateCallerId;
