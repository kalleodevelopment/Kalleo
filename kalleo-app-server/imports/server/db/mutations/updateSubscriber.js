import Subscriber from '../models/Subscriber';

const updateSubscriber = (conditions, update) => (
  Subscriber.findOneAndUpdate(conditions, update, {
    new: true,
    setDefaultsOnInsert: true,
  })
    .lean()
    .exec()
);

export default updateSubscriber;
