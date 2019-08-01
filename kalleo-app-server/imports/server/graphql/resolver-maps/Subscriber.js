import { getForwardingCode, getUnforwardingCode } from '../../phone';
import { handleGraphqlError, to } from '../../logging';

const Subscriber = {
  forwardingCode: async (subscriber) => {
    const [error, forwardingCode] = await to(getForwardingCode(subscriber));

    handleGraphqlError(error, 'Failed to retrieve forwarding code');

    return forwardingCode;
  },

  unforwardingCode: async (subscriber) => {
    const [error, unforwardingCode] = await to(getUnforwardingCode(subscriber));

    handleGraphqlError(error, 'Failed to retrieve unforwarding code');

    return unforwardingCode;
  },
};

export default Subscriber;
