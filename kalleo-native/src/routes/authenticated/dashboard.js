import { TabNavigator } from 'react-navigation';
import { pull } from 'lodash';
import settingsNavigation from './settings';
import RecentCallsScreen from '../../components/RecentCallsScreen';
import ContactsScreen from '../../components/ContactsScreen';
import DialerScreen from '../../components/DialerScreen';
import FeedbackScreen from '../../components/FeedbackScreen';
import { getTabNavigationOptions } from '../../helpers/navigation';
import { dashboardRoutes } from '../../constants/routes';

const contactsIcon = require('../../images/contacts.png');
const dialerIcon = require('../../images/dialer.png');
const recentsIcon = require('../../images/recents.png');
const feedbackIcon = require('../../images/feedback.png');
const settingsIcon = require('../../images/settings.png');

export default TabNavigator({
  [dashboardRoutes.CONTACTS_SCREEN]: {
    screen: ContactsScreen,
    navigationOptions: getTabNavigationOptions({
      label: 'Contacts',
      icon: contactsIcon,
    }),
  },
  [dashboardRoutes.DIALER_SCREEN]: {
    screen: DialerScreen,
    navigationOptions: getTabNavigationOptions({
      label: 'Dialer',
      icon: dialerIcon,
    }),
  },
  [dashboardRoutes.FEEDBACK_SCREEN]: {
    screen: FeedbackScreen,
    navigationOptions: getTabNavigationOptions({
      label: 'Feedback',
      icon: feedbackIcon,
    }),
  },
  [dashboardRoutes.RECENT_CALLS_SCREEN]: {
    screen: RecentCallsScreen,
    navigationOptions: getTabNavigationOptions({
      label: 'Recents',
      icon: recentsIcon,
    }),
  },
  [dashboardRoutes.SETTINGS_SCREEN]: {
    screen: settingsNavigation,
    navigationOptions: getTabNavigationOptions({
      label: 'Settings',
      icon: settingsIcon,
    }),
  },
}, {
  initialRouteName: dashboardRoutes.RECENT_CALLS_SCREEN,
  swipeEnabled: false,
  scrollEnabled: false,
  // TODO: Remove once contants is implemented
  order: pull(Object.keys(dashboardRoutes), dashboardRoutes.CONTACTS_SCREEN),
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#39B449',
    inactiveTintColor: '#808080',
    showIcon: true,
    style: {
      backgroundColor: '#F9F9F9',
    },
    tabStyle: {
      backgroundColor: '#F9F9F9',
      borderBottomWidth: 0,
    },
    labelStyle: {
      fontSize: 12,
    },
  },
});
