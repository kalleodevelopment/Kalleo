import { TabNavigator } from 'react-navigation';
import ValuePropsScreen from '../../components/ValuePropsScreen';
import ActivationDeactivationScreen from '../../components/ActivationDeactivationScreen';
import OnboardVerifyActivationScreen from '../../components/OnboardVerifyActivationScreen';
import CreateCallerId from '../../components/CreateCallerId';
import { onboardRoutes } from '../../constants/routes';
import { activationStatuses, onboardStatuses } from '../../constants/statuses';
import getNavigationOptions from '../../helpers/get-navigation-options';

export default ({ onboardStatus, activationStatus }) => {
  let initialRouteName = onboardStatus === onboardStatuses.UNSTARTED
    ? onboardRoutes.VALUE_PROPS_SCREEN
    : onboardRoutes.ACTIVATION_DEACTIVATION_SCREEN;

  if (activationStatus === activationStatuses.VERIFICATION_INITIATED) {
    initialRouteName = onboardRoutes.ONBOARD_VERIFY_ACTIVATION_SCREEN;
  }

  return TabNavigator({
    [onboardRoutes.CREATE_CALLER_ID_SCREEN]: {
      screen: CreateCallerId,
      navigationOptions: getNavigationOptions({ label: 'Create Caller ID', isVisible: false }),
    },
    [onboardRoutes.ACTIVATION_DEACTIVATION_SCREEN]: {
      screen: ActivationDeactivationScreen,
      navigationOptions: getNavigationOptions({ label: 'Activation', isVisible: false }),
    },
    [onboardRoutes.VALUE_PROPS_SCREEN]: {
      screen: ValuePropsScreen,
      navigationOptions: getNavigationOptions({ label: 'Value Props', isVisible: false }),
    },
    [onboardRoutes.ONBOARD_VERIFY_ACTIVATION_SCREEN]: {
      screen: OnboardVerifyActivationScreen,
      navigationOptions: getNavigationOptions({ labe: 'Verify Activation', isVisible: false }),
    },
  }, {
    initialRouteName,
    swipeEnabled: false,
    order: Object.keys(onboardRoutes),
  });
};
