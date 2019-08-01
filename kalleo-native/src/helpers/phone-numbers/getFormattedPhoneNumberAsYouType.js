import PhoneNumber from 'awesome-phonenumber';

export default ({ phoneNumber, digitToAdd, removeLastDigit }) => {
  // TODO: This should be dynamic based on the country code of the subscriber
  const phoneNumberAsYouType = PhoneNumber.getAsYouType('US');

  const cleanedPhoneNumber = phoneNumber
    ? phoneNumber.replace(/[^0-9]/g, '')
    : phoneNumber;

  phoneNumberAsYouType.reset(cleanedPhoneNumber);

  if (Number.isInteger(digitToAdd)) {
    return phoneNumberAsYouType.addChar(digitToAdd);
  } else if (removeLastDigit) {
    if (cleanedPhoneNumber && cleanedPhoneNumber.length === 1) {
      return null;
    }

    return phoneNumberAsYouType.removeChar();
  }

  return phoneNumberAsYouType.number();
};
