import to from 'await-to-js';
import publishInsertedCall from '../../publications/insertedCall';
import { lookup } from '../../../community';
import { callTypes, findSubscriberRelations, insertCall } from '../../../db';

// TODO: Handle phone numbers without international code
const createOutgoingCall = async (obj, { phoneNumber }, { subscriber }) => {
  const subscriberRelations = await findSubscriberRelations({
    subscriberId: subscriber._id, // eslint-disable-line no-underscore-dangle
    phoneNumber,
  });

  const [error, publicListing] = await to(lookup(phoneNumber));

  const callerIdName = error ? phoneNumber : publicListing.callerIdName;
  const listingType = error ? undefined : publicListing.type;

  const outgoingCall = await insertCall({
    phoneNumber,
    subscriberRelations,
    callerIdName,
    listingType,
    subscriberId: subscriber._id, // eslint-disable-line no-underscore-dangle
    type: callTypes.OUTGOING,
  });

  publishInsertedCall(outgoingCall);

  return outgoingCall;
};

export default createOutgoingCall;
