import { combineReducers } from 'redux';
import authCodeDigits from './authCodeDigits';
import loadingMutations from './loadingMutations';
import registration from './registration';
import { apolloClient } from '../../apollo';

const rootReducer = combineReducers({
  authCodeDigits,
  loadingMutations,
  registration,
  apollo: apolloClient.reducer(),
});

export default rootReducer;
