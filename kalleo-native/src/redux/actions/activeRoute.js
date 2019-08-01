import actions from './types';

const updateActiveRoute = activeRoute => ({
  activeRoute,
  type: actions.UPDATE_ACTIVE_ROUTE,
});

export default updateActiveRoute;
