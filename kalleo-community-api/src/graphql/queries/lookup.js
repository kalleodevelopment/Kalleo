import { findListing } from '../../db';

const lookup = (obj, { _id, phoneNumber }) => {
  if (_id) {
    return findListing({ _id });
  }

  if (phoneNumber) {
    return findListing({ phoneNumber });
  }

  return null;
};

export default lookup;
