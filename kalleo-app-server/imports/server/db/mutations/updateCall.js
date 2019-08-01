import Call from '../models/Call';

const updateCall = ({ _id }, update) => (
  Call.findOneAndUpdate(
    { _id },
    update,
    {
      new: true,
      setDefaultsOnInsert: true,
    },
  )
    .lean()
    .exec()
);

export default updateCall;
