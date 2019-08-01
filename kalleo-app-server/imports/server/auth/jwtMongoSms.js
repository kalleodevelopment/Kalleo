import JwtMongoSms from 'jwt-mongo-sms';
import {
  JWT_SECRET,
  AUTH_CODE_LENGTH,
  AUTH_CODE_TIMEOUT_SECONDS,
  MONGO_URI,
  TEST_SUBSCRIBER_PHONE_NUMBER,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SMS_PHONE_NUMBER,
} from '../config';

const jwtMongoSms = new JwtMongoSms({
  jwtSecret: JWT_SECRET,
  mongoUri: MONGO_URI,
  twilio: {
    accountSid: TWILIO_ACCOUNT_SID,
    authToken: TWILIO_AUTH_TOKEN,
    phoneNumber: TWILIO_SMS_PHONE_NUMBER,
  },
  setSmsMessage: (code => `Your verification code for kalleo is ${code}`),
  usersCollectionName: 'subscribers',
  authCollectionName: 'authCodes',
  requestKey: 'subscriber',
  authCodeLength: AUTH_CODE_LENGTH,
  authCodeTimeoutSeconds: AUTH_CODE_TIMEOUT_SECONDS,
  whitelistedPhoneNumber: TEST_SUBSCRIBER_PHONE_NUMBER,
});

jwtMongoSms.createAuthIndex();

export default jwtMongoSms;
