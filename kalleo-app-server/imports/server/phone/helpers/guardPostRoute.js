const guardPostRoute = routeHandler => (request, response, next) => {
  const { method } = request;

  if (method === 'POST') {
    routeHandler(request, response, next);
  } else {
    response.writeHead(404);
    response.end();
  }
};

export default guardPostRoute;
