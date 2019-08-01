import constantsToEnums from '../helpers/constantsToEnums';
import { lineTypes } from '../../db';

export default `
  enum LineType {
    ${constantsToEnums(lineTypes)}
  }
`;
