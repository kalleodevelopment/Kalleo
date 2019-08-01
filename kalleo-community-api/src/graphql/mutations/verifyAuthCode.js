import { verifyAuthCode } from '../../auth';
import { handleGraphqlError, to } from '../../logging';

export default async (obj, { phoneNumber, authCode }) => {
  const [error, session] = await to(verifyAuthCode({ phoneNumber, authCode }));

  handleGraphqlError(error);

  return {
    authToken: session.authToken,
    listing: session.user,
  };
};
