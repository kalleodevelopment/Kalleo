import blockNumber from './blockNumber';
import flagSpam from './flagSpam';
import unblockNumber from './unblockNumber';
import unflagSpam from './unflagSpam';
import updateCallerId from './updateCallerId';
import guardSubscriber from '../../helpers/guardSubscriber';

export default {
  blockNumber: guardSubscriber(blockNumber),
  flagSpam: guardSubscriber(flagSpam),
  unblockNumber: guardSubscriber(unblockNumber),
  unflagSpam: guardSubscriber(unflagSpam),
  updateCallerId: guardSubscriber(updateCallerId),
};
