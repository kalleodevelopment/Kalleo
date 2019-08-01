import winston from 'winston';
import rollbar from './rollbar';
import { NODE_ENV } from '../config';

export const logMessage = ({ message, request, type = 'info' } = {}) => {
  const currentDate = new Date().toLocaleString();
  const messageWithTime = `${currentDate}: ${message}`;

  winston[type](messageWithTime);

  if (NODE_ENV === 'production') {
    rollbar[type](messageWithTime, request);
  }
};

export const logError = ({ error, message, request }) => {
  logMessage({
    request,
    message: message || (error && (error.stack || error.message)),
    type: 'error',
  });
};

export default logMessage;
