import { findSubscriber, insertSubscriber } from '../db';

const seedSubscriber = async (subscriber) => {
  const { phoneNumber } = subscriber;

  let seededSubscriber = await findSubscriber({ phoneNumber });

  if (!seededSubscriber) {
    seededSubscriber = await insertSubscriber(subscriber);
  }

  return seededSubscriber;
};

export default seedSubscriber;
