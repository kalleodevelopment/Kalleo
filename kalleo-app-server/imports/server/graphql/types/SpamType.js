import constantsToEnums from '../helpers/constantsToEnums';
import { flaggedSpamTypes } from '../../db';

export default `
  enum SpamType {
    ${constantsToEnums(flaggedSpamTypes)}
  }
`;
