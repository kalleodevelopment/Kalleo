const getActiveRoute = (level) => {
  if (!level.index) {
    return level;
  }

  return getActiveRoute(level.routes[level.index]);
};

export default getActiveRoute;
