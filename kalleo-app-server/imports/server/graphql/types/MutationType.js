import constantsToEnums from '../helpers/constantsToEnums';
import mutationTypes from '../constants/mutationTypes';

export default `
  enum MutationType {
    ${constantsToEnums(mutationTypes)}
  }
`;
