import { activationStatuses, deactivationStatuses } from '../../../db';

const getSubscriberStatusByType = ({ activationStatus, deactivationStatus }, type) => {
  switch (type) {
    case 'ACTIVATION':
      return {
        status: activationStatus,
        statusToUpdate: 'activationStatus',
        statuses: activationStatuses,
      };
    default:
      return {
        status: deactivationStatus,
        statusToUpdate: 'deactivationStatus',
        statuses: deactivationStatuses,
      };
  }
};

export default getSubscriberStatusByType;
