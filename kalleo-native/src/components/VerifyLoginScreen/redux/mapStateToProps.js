import { Platform } from 'react-native';

export default ({
  auth: {
    isAuthenticated,
    phoneNumber,
    verificationCode,
  },
}) => ({
  isAuthenticated,
  phoneNumber,
  verificationCode,
  keyboardVerticalOffset: Platform.select({ ios: null, android: -30 }),
});
