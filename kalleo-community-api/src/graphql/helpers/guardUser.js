import { UserError } from 'graphql-errors';

const guardUser = (resolver, errorMessage) => (obj, args, context, info) => {
  const { user } = context;

  if (!user) {
    throw new UserError(errorMessage || 'Unauthorized');
  }

  return resolver(obj, args, context, info);
};

export default guardUser;
