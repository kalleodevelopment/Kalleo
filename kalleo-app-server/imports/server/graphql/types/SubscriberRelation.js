import constantsToEnums from '../helpers/constantsToEnums';
import { subscriberRelations } from '../../db';

export default `
  enum SubscriberRelation {
    ${constantsToEnums(subscriberRelations)}
  }
`;
