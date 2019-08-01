import { combineReducers } from 'redux';
import businessDetails from './businessDetails';
import consumerDetails from './consumerDetails';
import lineType from './lineType';
import listingType from './listingType';
import phoneNumber from './phoneNumber';
import step from './step';

const registration = combineReducers({
  businessDetails,
  consumerDetails,
  lineType,
  listingType,
  phoneNumber,
  step,
});

export default registration;
