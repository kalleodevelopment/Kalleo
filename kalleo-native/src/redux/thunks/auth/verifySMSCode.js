import Config from 'react-native-config';
import { Platform } from 'react-native';
import to from 'await-to-js';
import updateSubscriber from '../../actions/subscriber';
import { setAsyncStorageItem } from '../../../helpers/getSetAsyncStorage';
import { getFormattedPhoneNumber } from '../../../helpers/phone-numbers';
import { updateAuthIsAuthenticated, updateAuthVerifiedAuthentication } from '../../actions/auth';
import initiateNative from '../../../helpers/initiate-native';

const authorizeSubscriber = async (dispatch, { subscriber, authToken }) => {
  const { AUTH_ID_TOKEN } = Config;

  const [error] = await to(setAsyncStorageItem(AUTH_ID_TOKEN, authToken));

  if (!error) {
    dispatch(updateSubscriber(subscriber));
    dispatch(updateAuthVerifiedAuthentication(true));
    dispatch(updateAuthIsAuthenticated(true));

    initiateNative(Platform.OS);

    return subscriber;
  }

  throw error;
};

const verifySMSCode = ({ mutate }) => (
  async (dispatch, getState) => {
    const { auth: { phoneNumber, verificationCode } } = getState();

    const [error, result] = await to(mutate({
      variables: {
        phoneNumber: getFormattedPhoneNumber({ value: phoneNumber }),
        authCode: verificationCode.join(''),
      },
    }));

    if (!error) {
      return authorizeSubscriber(dispatch, { ...result.data.verifyAuthCode });
    }

    throw error;
  }
);

export default verifySMSCode;
