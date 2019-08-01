import { findFlaggedSpams } from '../../db';

const flaggedSpam = (obj, args, { subscriber }) => (
  // eslint-disable-next-line no-underscore-dangle
  findFlaggedSpams({ subscriberId: subscriber._id }, {}, {
    sort: {
      callerIdName: 1,
    },
  })
);

export default flaggedSpam;
