import { upsertListing } from '../../db';
import { subscriberLookup } from '../../listings';
import { handleGraphqlError, to } from '../../logging';

export default async (obj, { phoneNumber }) => {
  const [lookupError, listing] = await to(subscriberLookup(phoneNumber));

  handleGraphqlError(lookupError, `Failed to look up information for ${phoneNumber}`);

  const [upsertError, subscriber] = await to(upsertListing({ phoneNumber }, listing));

  handleGraphqlError(upsertError, `Failed to create/update listing for ${phoneNumber}`);

  return subscriber;
};
