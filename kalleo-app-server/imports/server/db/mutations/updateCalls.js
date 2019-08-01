import Call from '../models/Call';

const updateCalls = ({ phoneNumber, subscriberId }, update) => (
  Call.update(
    {
      phoneNumber,
      subscriberId,
    },
    update,
    {
      multi: true,
      setDefaultsOnInsert: true,
    },
  )
    .lean()
    .exec()
);

export default updateCalls;
