import jwtMongoSms from './jwtMongoSms';

export const getAuthMiddleware = () => jwtMongoSms.getAuthMiddleware();

export const sendAuthCode = phoneNumber => jwtMongoSms.sendAuthCode(phoneNumber);

export const verifyAuthCode = ({ phoneNumber, authCode }) => (
  jwtMongoSms.verifyAuthCode({ phoneNumber, authCode })
);
