import constantsToEnums from '../helpers/constantsToEnums';
import { listingTypes } from '../../db';

export default `
  enum ListingType {
    ${constantsToEnums(listingTypes)}
  }
`;
