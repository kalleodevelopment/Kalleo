import { sendAuthCodeViaCall, sendAuthCodeViaSms } from '../../auth';
import { lineTypes, listingTypes } from '../../db';
import { findOrInsertListing } from '../../listings';
import { handleGraphqlError, to, UserError } from '../../logging';

const authCodeSenders = {
  [lineTypes.LANDLINE]: sendAuthCodeViaCall,
  [lineTypes.MOBILE]: sendAuthCodeViaSms,
};

export default async (obj, { phoneNumber, lineType }) => {
  const [listingError, listing] = await to(findOrInsertListing(phoneNumber));

  handleGraphqlError(listingError, `Failed to look up information for ${phoneNumber}`);

  if (listing.type === listingTypes.SPAM) {
    throw new UserError(
      'According to our records, your phone number has been classified as spam',
    );
  }

  const sendAuthCode = authCodeSenders[lineType];
  const [sendAuthCodeError] = await to(sendAuthCode(phoneNumber));

  handleGraphqlError(sendAuthCodeError, `Failed to send authentication code to ${phoneNumber}`);

  return true;
};
