import constantsToEnums from '../helpers/constantsToEnums';
import { deactivationStatuses } from '../../db';

export default `
  enum DeactivationStatus {
    ${constantsToEnums(deactivationStatuses)}
  }
`;
