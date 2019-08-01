import { handleGraphqlError, to } from '../../../logging';
import {
  deleteBinding,
  findBinding,
  generateIdentity,
  registerBinding,
} from '../../../phone';

const registerForPushNotifications = async (obj, { deviceToken, device }, { subscriber }) => {
  const identity = generateIdentity(subscriber._id); // eslint-disable-line no-underscore-dangle

  let [error, binding] = await to(findBinding(identity, device));

  if (!binding) {
    [error, binding] = await to(registerBinding({ identity, device, address: deviceToken }));

    handleGraphqlError(error, 'Failed to register binding');
  } else {
    const { address, sid } = binding;

    if (address !== deviceToken) {
      [error] = await to(deleteBinding(sid, device));

      handleGraphqlError(error, 'Failed to delete binding');

      [error, binding] = await to(registerBinding({ identity, device, address: deviceToken }));

      handleGraphqlError(error, 'Failed to register binding');
    }
  }

  return binding.sid;
};

export default registerForPushNotifications;
