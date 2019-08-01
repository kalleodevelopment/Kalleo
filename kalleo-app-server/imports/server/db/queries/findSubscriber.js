import Subscriber from '../models/Subscriber';

const findSubscriber = conditions => (
  Subscriber
    .findOne(conditions)
    .lean()
    .exec()
);

export default findSubscriber;
