const cleanPhoneNumber = (phoneNumber) => {
  const strippedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const [firstCharacter] = phoneNumber;
  const prefix = firstCharacter === '+' ? '+' : '';

  return `${prefix}${strippedPhoneNumber}`;
};

export default cleanPhoneNumber;
