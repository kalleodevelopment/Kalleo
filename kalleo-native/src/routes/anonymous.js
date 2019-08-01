import { TabNavigator } from 'react-navigation';
import VerifyLoginScreen from '../components/VerifyLoginScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import { anonymousRoutes } from '../constants/routes';
import getNavigationOptions from '../helpers/get-navigation-options';

export default TabNavigator({
  [anonymousRoutes.VERIFY_LOGIN_SCREEN]: {
    screen: VerifyLoginScreen,
    navigationOptions: getNavigationOptions({ label: 'Verify Login', isVisible: false }),
  },
  [anonymousRoutes.WELCOME_SCREEN]: {
    screen: WelcomeScreen,
    navigationOptions: getNavigationOptions({ label: 'Welcome', isVisible: false }),
  },
}, {
  initialRouteName: anonymousRoutes.WELCOME_SCREEN,
  swipeEnabled: false,
  order: Object.keys(anonymousRoutes),
});
