import EStyleSheet from 'react-native-extended-stylesheet';
import { deactivationStatuses } from '../../constants/statuses';

const sharedStyles = {
  marginTop: '10%',
};

const getDeactivationStyles = (status) => {
  switch (status) {
    case deactivationStatuses.CALL_INITIATED:
    case deactivationStatuses.FAILED:
    case deactivationStatuses.VERIFICATION_INITIATED:
      return {
        container: {
          ...sharedStyles,
          backgroundColor: '$grayInputBackground',
          borderColor: '$redBlockedDark',
          borderWidth: 1,
        },
        text: {
          color: '$redBlockedDark',
        },
      };
    default:
      return {
        container: {
          ...sharedStyles,
          backgroundColor: '$redBlockedDark',
        },
        text: {
          color: '$white',
        },
      };
  }
};

const getActivationStyles = (status) => {
  switch (status) {
    case deactivationStatuses.CALL_INITIATED:
    case deactivationStatuses.FAILED:
    case deactivationStatuses.VERIFICATION_INITIATED:
      return {
        container: {
          ...sharedStyles,
          backgroundColor: '$primaryColor',
          borderColor: '$white',
          borderWidth: 1,
        },
        text: {
          color: '$white',
        },
      };
    default:
      return {
        container: {
          ...sharedStyles,
          backgroundColor: '$white',
        },
        text: {
          color: '$primaryColor',
        },
      };
  }
};

const getStyles = ({ status, type }) => {
  const styles = type === 'DEACTIVATION'
    ? getDeactivationStyles(status)
    : getActivationStyles(status);

  return EStyleSheet.create(styles);
};

export default getStyles;
