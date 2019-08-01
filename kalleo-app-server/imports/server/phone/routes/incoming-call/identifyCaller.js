import to from 'await-to-js';
import { lookup } from '../../../community';
import { listingTypes } from '../../../db';
import { logError } from '../../../logging';

const identifyCaller = async ({ phoneNumber }) => {
  const [error, listing] = await to(lookup(phoneNumber));

  if (error) {
    logError({ error });

    return {
      phoneNumber,
      listingType: listingTypes.UNIDENTIFIED,
    };
  }

  const {
    callerIdName,
    isRegistered,
    lineType,
    spamDetails,
    type,
  } = listing;

  return {
    callerIdName,
    isRegistered,
    lineType,
    phoneNumber,
    listingType: type,
    spamDetails: spamDetails || {},
  };
};

export default identifyCaller;
