import { findRecentCalls } from '../../db';

const recentCalls = (obj, args, { subscriber }) => (
  // eslint-disable-next-line no-underscore-dangle
  findRecentCalls({ subscriberId: subscriber._id })
);

export default recentCalls;
