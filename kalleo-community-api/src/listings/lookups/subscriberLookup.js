import dataFields from './everyone-api/dataFields';
import request from './everyone-api/request';
import toCallerIdName from '../mappers/toCallerIdName';
import { findCarrierByEveryoneApiName } from '../../carriers';
import { lineTypes, listingTypes } from '../../db';

const subscriberLookup = async (phoneNumber) => {
  const { number, data } = await request(phoneNumber, [
    dataFields.name,
    dataFields.cnam,
    dataFields.location,
    dataFields.carrier,
  ]);

  const {
    carrier = {},
    expanded_name: expandedName = {},
    location = {},
  } = data;

  const { first: firstName, last: lastName } = expandedName;
  const everyoneApiName = carrier.name && carrier.name.trim();

  const foundCarrier = await findCarrierByEveryoneApiName(everyoneApiName);

  const listing = {
    type: listingTypes.SUBSCRIBER,
    phoneNumber: number,
    callerIdName: toCallerIdName(data),
    countryCode: location.country,
    carrier: {
      everyoneApiName,
      id: foundCarrier && foundCarrier.id,
    },
    lineType: lineTypes.MOBILE,
    subscriberDetails: {
      firstName,
      lastName,
    },
  };

  return listing;
};

export default subscriberLookup;
