import Call from '../models/Call';

const findCall = conditions => (
  Call.findOne(conditions)
    .lean()
    .exec()
);

export default findCall;
