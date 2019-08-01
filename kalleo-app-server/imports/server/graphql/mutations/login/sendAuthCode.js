import { sendAuthCode } from '../../../auth';
import { subscriberLookup } from '../../../community';
import { findSubscriber, insertSubscriber } from '../../../db';
import { handleGraphqlError, to } from '../../../logging';

export default async (obj, { phoneNumber }) => {
  const subscriber = await findSubscriber({ phoneNumber });

  if (!subscriber) {
    const [error, subscriberListing] = await to(subscriberLookup(phoneNumber));

    handleGraphqlError(error, `Failed to look up information for ${phoneNumber}`);

    const {
      callerIdName,
      carrier,
      countryCode,
      phoneNumber: formattedPhoneNumber,
    } = subscriberListing;

    await insertSubscriber({
      callerIdName,
      countryCode,
      carrierId: carrier ? carrier.id : null,
      phoneNumber: formattedPhoneNumber,
    });
  }

  const [error] = await to(sendAuthCode(phoneNumber));

  handleGraphqlError(error, `Failed to send auth code to ${phoneNumber}`);

  return true;
};
