import { WebApp } from 'meteor/webapp';
import routePaths from './constants/routePaths';
import guardPostRoute from './helpers/guardPostRoute';
import activationCallback from './activation-deactivation/verification/activationCallback';
import deactivationCallback from './activation-deactivation/verification/deactivationCallback';
import handleCallStatusChanges from './routes/call-status-changes';
import handleDialCallStatus from './routes/dial-call-status';
import handleIncomingCall from './routes/incoming-call';
import handleIncomingCallFailed from './routes/incoming-call-failed';
import handleTestCall from './routes/test-call';
import handleVoicemail from './routes/voicemail';
import { gatherPhoneNumber, gatherPhoneNumberTimeout } from './routes/gather-phone-number';

import { NODE_ENV } from '../config';

const routeMap = {
  [routePaths.ACTIVATION]: activationCallback,
  [routePaths.CALL_STATUS_CHANGES]: handleCallStatusChanges,
  [routePaths.DEACTIVATION]: deactivationCallback,
  [routePaths.DIAL_CALL_STATUS]: handleDialCallStatus,
  [routePaths.INCOMING_CALL]: handleIncomingCall,
  [routePaths.INCOMING_CALL_FAILED]: handleIncomingCallFailed,
  [routePaths.VOICEMAIL]: handleVoicemail,
  [routePaths.GATHER_PHONE_NUMBER]: gatherPhoneNumber,
  [routePaths.GATHER_PHONE_NUMBER_TIMEOUT]: gatherPhoneNumberTimeout,
};

const configureRoutes = () => {
  Object.keys(routeMap).forEach((path) => {
    const handler = routeMap[path];

    WebApp.connectHandlers.use(path, guardPostRoute(handler));
  });

  if (NODE_ENV === 'development') {
    WebApp.connectHandlers.use(routePaths.TEST_CALL, handleTestCall);
  }
};

export default configureRoutes;
