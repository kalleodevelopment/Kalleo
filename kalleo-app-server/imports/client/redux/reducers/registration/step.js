import actionTypes from '../../constants/actionTypes';
import registrationSteps from '../../constants/registrationSteps';

const step = (state = registrationSteps.SEND_AUTH_CODE, action) => {
  switch (action.type) {
    case actionTypes.SET_REGISTRATION_STEP:
      return action.step;
    case actionTypes.RESTART_REGISTRATION:
      return registrationSteps.SEND_AUTH_CODE;
    case actionTypes.START_REGISTRATION_SESSION:
      return registrationSteps.UPDATE_CALLER_ID;
    default:
      return state;
  }
};

export default step;
