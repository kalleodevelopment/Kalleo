import { findBlockedNumbers } from '../../db';

const blockedNumbers = (obj, args, { subscriber }) => (
  // eslint-disable-next-line no-underscore-dangle
  findBlockedNumbers({ subscriberId: subscriber._id }, {}, {
    sort: {
      callerIdName: 1,
    },
  })
);

export default blockedNumbers;
