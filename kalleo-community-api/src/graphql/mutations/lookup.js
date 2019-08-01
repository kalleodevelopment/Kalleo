import { findOrInsertListing } from '../../listings';
import { handleGraphqlError, to } from '../../logging';

const lookup = async (obj, { phoneNumber }) => {
  const [listingError, listing] = await to(findOrInsertListing(phoneNumber));

  handleGraphqlError(listingError, `Failed to look up information for ${phoneNumber}`);

  return listing;
};

export default lookup;
