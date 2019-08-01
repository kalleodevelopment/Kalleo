import actions from './types';

const updateSubscriber = subscriber => ({
  subscriber,
  type: actions.UPDATE_SUBSCRIBER,
});

export default updateSubscriber;

