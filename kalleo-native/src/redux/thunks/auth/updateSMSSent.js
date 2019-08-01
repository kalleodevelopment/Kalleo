import to from 'await-to-js';
import { updateAuthSMSSent } from '../../actions/auth';
import { getFormattedPhoneNumber } from '../../../helpers/phone-numbers';

const updateSMSSent = ({ mutate }) => (
  async (dispatch, getState) => {
    const { auth: { phoneNumber } } = getState();

    if (!phoneNumber) {
      throw new Error('Please input your phone number.');
    }

    const [error, result] = await to(mutate({
      variables: {
        phoneNumber: getFormattedPhoneNumber({
          validateNumber: false,
          value: phoneNumber,
        }),
      },
    }));

    if (error) {
      throw error;
    }

    const { sendAuthCode } = result.data;

    dispatch(updateAuthSMSSent(sendAuthCode));

    return sendAuthCode;
  }
);

export default updateSMSSent;
