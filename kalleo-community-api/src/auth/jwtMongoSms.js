import JwtMongoSms from 'jwt-mongo-sms';
import routePaths from './constants/routePaths';
import {
  JWT_SECRET,
  AUTH_CODE_LENGTH,
  AUTH_CODE_TIMEOUT_SECONDS,
  MONGODB_URI,
  ROOT_URL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} from '../config';
import { textMessages } from '../content';
import { collectionNames } from '../db';

const jwtMongoSms = new JwtMongoSms({
  jwtSecret: JWT_SECRET,
  mongoUri: MONGODB_URI,
  twilio: {
    accountSid: TWILIO_ACCOUNT_SID,
    authToken: TWILIO_AUTH_TOKEN,
    phoneNumber: TWILIO_PHONE_NUMBER,
  },
  callUrl: `${ROOT_URL}${routePaths.AUTH_CALL}`,
  setSmsMessage: textMessages.AUTH_CODE,
  usersCollectionName: collectionNames.listings,
  authCollectionName: collectionNames.authCodes,
  authCodeLength: AUTH_CODE_LENGTH,
  authCodeTimeoutSeconds: AUTH_CODE_TIMEOUT_SECONDS,
});

jwtMongoSms.createAuthIndex();

export default jwtMongoSms;
