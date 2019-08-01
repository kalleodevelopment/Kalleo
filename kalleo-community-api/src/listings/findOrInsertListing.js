import to from 'await-to-js';
import identify from './lookups/identify';
import spamLookup from './lookups/spamLookup';
import { findListing, insertListing } from '../db';
import { handleError, logMessage } from '../logging';

const findOrInsertListing = async (phoneNumber) => {
  logMessage({ message: 'listings (findOrInsertListing): Find listing' });

  let listing = await findListing({ phoneNumber });

  if (!listing) {
    logMessage({ message: 'listings (findOrInsertListing): No existing listing found' });

    const [spamError, spamListing] = await to(spamLookup(phoneNumber));

    handleError(spamError, `Failed to look up spam information for ${phoneNumber}`);

    const [identifyError, identifiedListing] = await to(identify(phoneNumber));

    handleError(identifyError, `Failed to identify ${phoneNumber}`);

    listing = spamListing
      ? {
        ...identifiedListing,
        ...spamListing,
      }
      : identifiedListing;

    listing = await insertListing(listing);

    logMessage({ message: `listings (findOrInsertListing): ${listing.type} listing inserted` });
  } else {
    logMessage({ message: 'listings (findOrInsertListing): Listing found' });
  }

  logMessage({ message: `listings (findOrInsertListing): Return listing: ${listing}` });

  return listing;
};

export default findOrInsertListing;
