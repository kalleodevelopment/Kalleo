import { StackNavigator } from 'react-navigation';
import SettingsMenuScreen from '../../components/SettingsMenuScreen';
import UpdateCallerIdScreen from '../../components/UpdateCallerIdScreen';
import SettingsBlockedListScreen from '../../components/SettingsBlockedListScreen';
import SettingsSpamListScreen from '../../components/SettingsSpamListScreen';
import ActivationDeactivationScreen from '../../components/ActivationDeactivationScreen';
import SettingsVerifyActivationScreen from '../../components/SettingsVerifyActivationScreen';
import { getStackNavigationOptions } from '../../helpers/navigation';
import { settingsRoutes } from '../../constants/routes';

export default StackNavigator({
  [settingsRoutes.SETTINGS_MENU_SCREEN]: {
    screen: SettingsMenuScreen,
    navigationOptions: getStackNavigationOptions({
      header: null,
    }),
  },
  [settingsRoutes.UPDATE_CALLER_ID_SCREEN]: {
    screen: UpdateCallerIdScreen,
    navigationOptions: getStackNavigationOptions({
      title: 'Edit Caller ID',
    }),
  },
  [settingsRoutes.BLOCKED_LIST_SCREEN]: {
    screen: SettingsBlockedListScreen,
    navigationOptions: getStackNavigationOptions({
      title: 'Blocked',
    }),
  },
  [settingsRoutes.SPAM_LIST_SCREEN]: {
    screen: SettingsSpamListScreen,
    navigationOptions: getStackNavigationOptions({
      title: 'Spam',
    }),
  },
  [settingsRoutes.ACTIVATION_DEACTIVATION_SCREEN]: {
    screen: ActivationDeactivationScreen,
  },
  [settingsRoutes.SETTINGS_VERIFY_ACTIVATION_SCREEN]: {
    screen: SettingsVerifyActivationScreen,
    navigationOptions: getStackNavigationOptions({
      title: 'Verify Activation',
    }),
  },
}, {
  initialRouteName: settingsRoutes.SETTINGS_MENU_SCREEN,
  headerMode: 'screen',
});
