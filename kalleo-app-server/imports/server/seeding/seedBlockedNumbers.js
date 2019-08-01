import { findBlockedNumbers, insertBlockedNumber } from '../db';

const seedBlockedNumbers = async (blockedNumbers, subscriberId) => {
  const foundBlockedNumbers = await findBlockedNumbers({ subscriberId });

  if (foundBlockedNumbers.length === 0) {
    await Promise.all(blockedNumbers.map(blockedNumber => insertBlockedNumber({
      ...blockedNumber,
      subscriberId,
    })));
  }
};

export default seedBlockedNumbers;
