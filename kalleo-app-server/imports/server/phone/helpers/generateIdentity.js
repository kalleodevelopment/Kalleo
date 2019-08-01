const generateIdentity = (subscriberId) => {
  const clientId = typeof subscriberId === 'string'
    ? subscriberId
    : subscriberId.toString();

  const identity = `client_${clientId}`;

  return identity;
};

export default generateIdentity;
