import sendPushNotification from '../../twilio/notify/sendPushNotification';
import { pushNotificationMessages } from '../../../content';
import { callStatuses, listingTypes } from '../../../db';
import { publishInsertedCall } from '../../../graphql/publications';

const notifySubscriber = async ({ callDoc, identifiedCaller }) => {
  const {
    _id: callId,
    status: callStatus,
    subscriberId,
  } = callDoc;

  const {
    callerIdName,
    listingType,
    phoneNumber,
    spamDetails = {},
  } = identifiedCaller;

  const callerIdNameOrPhoneNumber = callerIdName || phoneNumber;
  const spamCategory = spamDetails.reputation && spamDetails.reputation.category;

  let message;

  switch (callStatus) {
    case callStatuses.BLOCKED: {
      if (listingType === listingTypes.SPAM) {
        message = pushNotificationMessages.SPAM_CALL(callerIdNameOrPhoneNumber, spamCategory);
      } else {
        message = pushNotificationMessages.BLACKLISTED_CALL(callerIdNameOrPhoneNumber);
      }
      break;
    }
    case callStatuses.DIRECT_TO_VOICEMAIL:
      message = pushNotificationMessages.UNIDENTIFIED_CALL(phoneNumber);
      break;
    default:
      break;
  }

  if (callId && callStatus !== callStatuses.DIALED) {
    publishInsertedCall(callDoc);
  }

  if (message) {
    await sendPushNotification({
      subscriberId,
      body: message,
    });
  }
};

export default notifySubscriber;
