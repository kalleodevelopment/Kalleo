import activationDeactivation from './activation-deactivation';
import calls from './calls';
import dashboardSettings from './dashboard-settings';
import feedback from './feedback';
import login from './login';
import pushNotifications from './push-notifications';

export default {
  ...activationDeactivation,
  ...calls,
  ...dashboardSettings,
  ...feedback,
  ...login,
  ...pushNotifications,
};
