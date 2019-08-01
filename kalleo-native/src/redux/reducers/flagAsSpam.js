import actions from '../actions/types';

const initialState = {
  callerToFlag: {
    callerIdName: null,
    listingType: null,
    phoneNumber: null,
    recenter: null,
  },
  isModalVisible: false,
  selectedSpamType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_IS_MODAL_VISIBLE:
      return { ...state, isModalVisible: action.isModalVisible };
    case actions.UPDATE_SELECTED_SPAM_TYPE:
      return { ...state, selectedSpamType: action.selectedSpamType };
    case actions.UPDATE_CALLER_TO_FLAG:
      return { ...state, callerToFlag: action.callerToFlag };
    case actions.RESET_FLAG_AS_SPAM:
      return initialState;
    default:
      return state;
  }
};
