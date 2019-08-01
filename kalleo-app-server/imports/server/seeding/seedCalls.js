import { findRecentCalls, insertCall } from '../db';

const seedCalls = async (calls, subscriberId) => {
  const foundCalls = await findRecentCalls({ subscriberId });

  if (foundCalls.length === 0) {
    await Promise.all(calls.map(call => insertCall({
      ...call,
      subscriberId,
    })));
  }
};

export default seedCalls;
