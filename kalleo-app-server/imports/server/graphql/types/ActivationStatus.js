import constantsToEnums from '../helpers/constantsToEnums';
import { activationStatuses } from '../../db';

export default `
  enum ActivationStatus {
    ${constantsToEnums(activationStatuses)}
  }
`;
