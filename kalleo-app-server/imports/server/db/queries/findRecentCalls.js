import Call from '../models/Call';
import { RECENT_CALLS_QUERY_LIMIT } from '../../config';

const findRecentCalls = conditions => (
  Call.find(conditions, {}, {
    sort: {
      createdAt: -1,
    },
    limit: RECENT_CALLS_QUERY_LIMIT,
  })
    .lean()
    .exec()
);

export default findRecentCalls;
