import { getAuthCallHandler } from 'jwt-mongo-sms';
import jwtMongoSms from './jwtMongoSms';
import routePaths from './constants/routePaths';
import { recordedCallMessages } from '../content';
import { AUTH_CALL_CODE_REPETITION_COUNT } from '../config';

const configureAuth = (app) => {
  app.use(jwtMongoSms.getAuthMiddleware());

  app.use(routePaths.AUTH_CALL, getAuthCallHandler(
    (voiceResponse, authCode) => {
      for (let i = 0; i < AUTH_CALL_CODE_REPETITION_COUNT; i += 1) {
        voiceResponse.play(recordedCallMessages.AUTH_CODE);
        voiceResponse.say({ voice: 'woman' }, authCode);
      }
    },
  ));
};

export default configureAuth;
