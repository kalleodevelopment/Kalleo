import first from 'lodash.first';

export default payload => (
  Array.isArray(payload)
    ? first(payload).subscriberId.toString()
    : payload.subscriberId.toString()
);
