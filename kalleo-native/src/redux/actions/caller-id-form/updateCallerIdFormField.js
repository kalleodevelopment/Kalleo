import actions from '../types';

export default (field, value = '') => ({
  field,
  value,
  type: actions.UPDATE_CALLER_ID_FORM_FIELD,
});
