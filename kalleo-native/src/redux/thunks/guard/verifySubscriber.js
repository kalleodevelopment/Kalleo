import Config from 'react-native-config';
import { getAsyncStorageItem } from '../../../helpers/getSetAsyncStorage';
import { updateAuthVerifiedAuthentication, updateAuthIsAuthenticated } from '../../actions/auth';

export default () => (
  async (dispatch) => {
    const { AUTH_ID_TOKEN } = Config;

    const token = await getAsyncStorageItem(AUTH_ID_TOKEN);

    if (token) {
      dispatch(updateAuthIsAuthenticated(true));
    }

    dispatch(updateAuthVerifiedAuthentication(true));

    return token;
  }
);
