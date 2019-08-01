import actions from '../actions/types';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
};

const callerIdForm = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_CALLER_ID_FORM_FIELD:
      return { ...state, [action.field]: action.value };
    case actions.UPDATE_CALLER_ID_FORM_FIELDS:
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

export default callerIdForm;
