import EStyleSheet from 'react-native-extended-stylesheet';
import { settingsRoutes } from '../constants/routes';

const redRightArrowIcon = require('../images/arrow-right-deactivate.png');
const greenRightArrowIcon = require('../images/arrow-right-activation.png');

export default subscriberIsDeactivated => ({
  [settingsRoutes.UPDATE_CALLER_ID_SCREEN]: {
    screenToNavigateTo: settingsRoutes.UPDATE_CALLER_ID_SCREEN,
    title: 'Edit Caller ID',
  },
  [settingsRoutes.BLOCKED_LIST_SCREEN]: {
    screenToNavigateTo: settingsRoutes.BLOCKED_LIST_SCREEN,
    title: 'Blocked',
  },
  [settingsRoutes.SPAM_LIST_SCREEN]: {
    screenToNavigateTo: settingsRoutes.SPAM_LIST_SCREEN,
    title: 'Spam',
  },
  [settingsRoutes.ACTIVATION_DEACTIVATION_SCREEN]: {
    icon: subscriberIsDeactivated ? greenRightArrowIcon : redRightArrowIcon,
    screenToNavigateTo: settingsRoutes.ACTIVATION_DEACTIVATION_SCREEN,
    styles: EStyleSheet.create({
      title: {
        color: subscriberIsDeactivated ? '$primaryColor' : '$redBlockedDark',
      },
    }),
    title: `${subscriberIsDeactivated ? 'Activate' : 'Deactivate'} my account`,
  },
});
