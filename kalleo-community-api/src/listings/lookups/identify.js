import dataFields from './everyone-api/dataFields';
import request from './everyone-api/request';
import toBusinessDetails from '../mappers/toBusinessDetails';
import toConsumerDetails from '../mappers/toConsumerDetails';
import toCallerIdName from '../mappers/toCallerIdName';
import { findCarrierByEveryoneApiName } from '../../carriers';
import { listingTypes } from '../../db';

const detailsTransformersMap = {
  business: toBusinessDetails,
  person: toConsumerDetails,
};

const listingTypesMap = {
  business: listingTypes.BUSINESS,
  person: listingTypes.CONSUMER,
};

const identify = async (phoneNumber) => {
  const { number, type, data } = await request(phoneNumber, [
    dataFields.name,
    dataFields.address,
    dataFields.cnam,
    dataFields.carrier,
    dataFields.linetype,
  ]);

  const { linetype, carrier = {}, location = {} } = data;
  const toDetails = detailsTransformersMap[type] || (() => ({}));

  const everyoneApiName = carrier.name && carrier.name.trim();
  const foundCarrier = await findCarrierByEveryoneApiName(everyoneApiName);

  const listing = {
    ...toDetails(data),
    type: listingTypesMap[type],
    phoneNumber: number,
    callerIdName: type === 'unknown' ? null : toCallerIdName(data),
    countryCode: location.country,
    carrier: {
      everyoneApiName,
      id: foundCarrier && foundCarrier.id,
    },
    lineType: linetype && linetype.toUpperCase(),
  };

  return listing;
};

export default identify;
