import testBlockedNumber from './testBlockedNumber';
import {
  callStatuses,
  callTypes,
  lineTypes,
  listingTypes,
  subscriberRelations,
} from '../../db';

const testCalls = [
  {
    callerIdName: null,
    lineType: lineTypes.MOBILE,
    listingType: listingTypes.UNIDENTIFIED,
    phoneNumber: '+15555550101',
    status: callStatuses.DIRECT_TO_VOICEMAIL,
    type: callTypes.INCOMING,
  },
  {
    callerIdName: 'Dentist',
    lineType: lineTypes.LANDLINE,
    listingType: listingTypes.BUSINESS,
    phoneNumber: '+15555550102',
    status: callStatuses.MISSED,
    type: callTypes.INCOMING,
  },
  {
    ...testBlockedNumber,
    lineType: lineTypes.MOBILE,
    listingType: listingTypes.CONSUMER,
    status: callStatuses.BLOCKED,
    subscriberRelations: [subscriberRelations.BLOCKED_NUMBER],
    type: callTypes.INCOMING,
  },
  {
    callerIdName: 'Mom',
    lineType: lineTypes.MOBILE,
    listingType: listingTypes.CONSUMER,
    phoneNumber: '+15555550104',
    type: callTypes.OUTGOING,
  },
  {
    callerIdName: 'Robocaller',
    lineType: lineTypes.LANDLINE,
    listingType: listingTypes.SPAM,
    phoneNumber: '+15555550105',
    status: callStatuses.BLOCKED,
    type: callTypes.INCOMING,
  },
];

export default testCalls;
