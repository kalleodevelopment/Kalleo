import constantsToEnums from '../helpers/constantsToEnums';
import { callTypes } from '../../db';

export default `
  enum CallType {
    ${constantsToEnums(callTypes)}
  }
`;
