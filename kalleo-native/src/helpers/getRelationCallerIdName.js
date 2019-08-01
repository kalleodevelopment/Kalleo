import { listingTypes } from '../constants/recent-calls';

export default (callerIdName, listingType, phoneNumber) => {
  if (listingType === listingTypes.UNIDENTIFIED) {
    return phoneNumber;
  }

  return callerIdName;
};
