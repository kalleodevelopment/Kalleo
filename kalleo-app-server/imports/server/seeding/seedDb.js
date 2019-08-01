import seedAccount from './seedAccount';
import mockAccounts from './mock-data/accounts';
import { handleError, to } from '../logging';

const seedDb = async () => {
  const [seedAccountsError] = await to(Promise.all(mockAccounts.map(seedAccount)));

  handleError(seedAccountsError, 'Failed to seed accounts');
};

export default seedDb;
