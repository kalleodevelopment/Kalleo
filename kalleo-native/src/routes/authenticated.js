import dashboardScreens from './authenticated/dashboard';
import getOnboardingScreens from './authenticated/onboarding';

export default (subscriber) => {
  const { accountStatus } = subscriber;

  switch (accountStatus) {
    case 'ACTIVE':
      return dashboardScreens;
    default:
      return getOnboardingScreens(subscriber);
  }
};
