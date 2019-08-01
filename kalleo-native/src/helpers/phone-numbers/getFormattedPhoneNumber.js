import PhoneNumber from 'awesome-phonenumber';
import Config from 'react-native-config';
import phoneNumberFormats from '../../constants/phoneNumberFormats';
import showAlertDialog from '../../helpers/showAlertDialog';

export default ({
  value,
  format = phoneNumberFormats.E164,
  validateNumber = true,
}) => {
  const { TEST_SUBSCRIBER_PHONE_NUMBER } = Config;

  // TODO: This should by the subscribers country code
  const phoneNumber = new PhoneNumber(value, 'US');

  if (
    !validateNumber
    || phoneNumber.getNumber(phoneNumberFormats.E164) === TEST_SUBSCRIBER_PHONE_NUMBER
  ) {
    return phoneNumber.getNumber(format);
  }

  if (!phoneNumber.isValid()) {
    showAlertDialog({
      title: 'Error',
      message: 'Invalid phone number',
    });
  }

  return phoneNumber.getNumber(format);
};
