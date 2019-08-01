import Subscriber from '../models/Subscriber';

const insertSubscriber = async subscriber => (
  Subscriber.create(subscriber)
);

export default insertSubscriber;
