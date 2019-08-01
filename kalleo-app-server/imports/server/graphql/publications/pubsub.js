import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';
import Redis from 'ioredis';
import { NODE_ENV, REDIS_URL } from '../../config';

const pubsub = NODE_ENV === 'production'
  ? new RedisPubSub({
    publisher: new Redis(REDIS_URL),
    subscriber: new Redis(REDIS_URL),
  })
  : new PubSub();

export default pubsub;
