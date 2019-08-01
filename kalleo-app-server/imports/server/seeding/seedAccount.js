import seedBlockedNumbers from './seedBlockedNumbers';
import seedCalls from './seedCalls';
import seedSubscriber from './seedSubscriber';

const seedAccount = async ({ blockedNumbers, calls, subscriber }) => {
  const { _id: subscriberId } = await seedSubscriber(subscriber);

  await seedBlockedNumbers(blockedNumbers, subscriberId);
  await seedCalls(calls, subscriberId);
};

export default seedAccount;
