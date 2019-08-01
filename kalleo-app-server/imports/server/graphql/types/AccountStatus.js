import constantsToEnums from '../helpers/constantsToEnums';
import { accountStatuses } from '../../db';

export default `
  enum AccountStatus {
    ${constantsToEnums(accountStatuses)}
  }
`;
