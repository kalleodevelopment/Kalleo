import { TEST_SUBSCRIBER_PHONE_NUMBER } from '../../config';
import {
  accountStatuses,
  activationStatuses,
  deactivationStatuses,
  onboardStatuses,
} from '../../db';

const testSubscriber = {
  accountStatus: accountStatuses.ACTIVE,
  activationStatus: activationStatuses.UNSTARTED,
  deactivationStatus: deactivationStatuses.VERIFIED,
  callerIdName: 'Test Subscriber',
  carrierId: null,
  countryCode: 'US',
  email: 'testsubscriber@example.com',
  firstName: 'Test',
  lastName: 'Subscriber',
  onboardStatus: onboardStatuses.COMPLETED,
  phoneNumber: TEST_SUBSCRIBER_PHONE_NUMBER,
};

export default testSubscriber;
