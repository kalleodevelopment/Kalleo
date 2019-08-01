import constantsToEnums from '../helpers/constantsToEnums';
import { callStatuses } from '../../db';

export default `
  enum CallStatus {
    ${constantsToEnums(callStatuses)}
  }
`;
