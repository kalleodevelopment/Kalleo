const mapStateToDispatch = ({
  auth: {
    verificationCode,
  },
  activeRoute,
}) => {
  let route;

  if (activeRoute.routes) {
    route = activeRoute.routes[activeRoute.index];
  } else if (activeRoute.routeName) {
    route = activeRoute.routeName;
  }

  return {
    verificationCode,
    activeRoute: route ? route.routeName : undefined,
  };
};

export default mapStateToDispatch;
