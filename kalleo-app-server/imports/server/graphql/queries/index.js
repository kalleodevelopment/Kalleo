import blockedNumbers from './blockedNumbers';
import carrier from './carrier';
import flaggedSpam from './flaggedSpam';
import recentCalls from './recentCalls';
import subscriber from './subscriber';
import guardSubscriber from '../helpers/guardSubscriber';

export default {
  blockedNumbers: guardSubscriber(blockedNumbers),
  carrier: guardSubscriber(carrier),
  flaggedSpam: guardSubscriber(flaggedSpam),
  recentCalls: guardSubscriber(recentCalls),
  subscriber: guardSubscriber(subscriber),
};
