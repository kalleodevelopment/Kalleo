import { carrierLookup } from '../../community';
import { handleGraphqlError, to } from '../../logging';

export default async (obj, args, { subscriber }) => {
  const [error, carrier] = await to(carrierLookup(subscriber.carrierId));

  handleGraphqlError(error, `Failed to retrieve carrier info for ${subscriber.phoneNumber}`);

  return carrier;
};
