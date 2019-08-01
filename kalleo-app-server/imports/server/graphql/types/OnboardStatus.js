import constantsToEnums from '../helpers/constantsToEnums';
import { onboardStatuses } from '../../db';

export default `
  enum OnboardStatus {
    ${constantsToEnums(onboardStatuses)}
  }
`;
