import { MongoCall } from '../typings';

const sanitizeCalls = (calls: MongoCall[]) : any => (
  calls.map(({ _id, listingType, status, type, subscriberForwardedFrom }) => ({
    listingType,
    status,
    type,
    subscriberForwardedFrom,
    callId: _id,
  }))
);

export default sanitizeCalls;

