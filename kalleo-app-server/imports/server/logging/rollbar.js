import Rollbar from 'rollbar';
import { NODE_ENV, ROLLBAR_ACCESS_TOKEN } from '../config';

const isProductionEnv = NODE_ENV === 'production';

export default new Rollbar({
  accessToken: ROLLBAR_ACCESS_TOKEN,
  captureUncaught: isProductionEnv, // handler for any uncaught exceptions
  captureUnhandledRejections: isProductionEnv, // handler for any unhandled Promise rejections
});
