import { combineReducers } from 'redux';
import activeRoute from './activeRoute';
import auth from './auth';
import callerIdForm from './callerIdForm';
import dialer from './dialer';
import flagAsSpam from './flagAsSpam';
import incomingCall from './incomingCall';
import isLoading from './isLoading';
import onGoingCall from './onGoingCall';
import subscriber from './subscriber';
import subscriberFeedback from './subscriberFeedback';
import valueProps from './value-props';
import verification from './verification';

const combineApolloAndRootReducers = apollo => (
  combineReducers({
    activeRoute,
    apollo,
    auth,
    callerIdForm,
    dialer,
    flagAsSpam,
    incomingCall,
    isLoading,
    onGoingCall,
    subscriber,
    subscriberFeedback,
    valueProps,
    verification,
  })
);

export default combineApolloAndRootReducers;
