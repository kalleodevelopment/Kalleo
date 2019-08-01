import jwtMongoSms from './jwtMongoSms';

export { default as configureAuth } from './configureAuth';

export const sendAuthCodeViaCall = phoneNumber => (
  jwtMongoSms.sendAuthCodeViaCall(phoneNumber)
);

export const sendAuthCodeViaSms = phoneNumber => (
  jwtMongoSms.sendAuthCodeViaSms(phoneNumber)
);

export const verifyAuthCode = ({ phoneNumber, authCode }) => (
  jwtMongoSms.verifyAuthCode({ phoneNumber, authCode })
);
