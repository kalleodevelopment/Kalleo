import { Carrier } from '../../carrier';
import { MongoSubscriber } from '../typings';

const sanitizeSubscriber = async (subscribers: MongoSubscriber[]) => {
  const carrier = new Carrier();

  await carrier.fetch();

  return subscribers.map(({
    _id,
    accountStatus,
    activationStatus,
    deactivationStatus,
    carrierId,
    ...subscriber
  }) => {
    const subscriberCarrier = carrier.findById(carrierId);

    return {
      accountStatus,
      activationStatus,
      deactivationStatus,
      carrier: !subscriberCarrier ? 'Unsupported' : subscriberCarrier.name,
      subscriberId: _id,
    };
  });
};

export default sanitizeSubscriber;
