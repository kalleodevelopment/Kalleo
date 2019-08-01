import { UserError } from 'graphql-errors';

const guardSubscriber = (resolver, errorMessage) => (obj, args, context, info) => {
  const { subscriber } = context;

  if (!subscriber) {
    throw new UserError(errorMessage || 'Unauthorized');
  }

  return resolver(obj, args, context, info);
};

export default guardSubscriber;
