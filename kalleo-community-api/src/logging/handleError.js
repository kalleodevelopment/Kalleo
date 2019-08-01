import { UserError } from 'graphql-errors';
import AppError from './AppError';
import { logError } from './logMessage';

export const handleError = (error, message, NewErrorType = AppError) => {
  if (error instanceof Error) {
    logError({ error });

    const clientErrorMessage = error instanceof AppError
      ? error.message
      : (message || error.message);

    throw new NewErrorType(clientErrorMessage);
  }
};

export const handleGraphqlError = (error, message) => {
  handleError(error, message, UserError);
};

export default handleError;
