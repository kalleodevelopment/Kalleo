import actions from './types';

const resetFlagAsSpam = () => ({
  type: actions.RESET_FLAG_AS_SPAM,
});

const updateIsModalVisible = isModalVisible => ({
  isModalVisible,
  type: actions.UPDATE_IS_MODAL_VISIBLE,
});

const updateSelectedSpamType = selectedSpamType => ({
  selectedSpamType,
  type: actions.UPDATE_SELECTED_SPAM_TYPE,
});

const updateCallerToFlag = callerToFlag => ({
  callerToFlag,
  type: actions.UPDATE_CALLER_TO_FLAG,
});

export {
  resetFlagAsSpam,
  updateCallerToFlag,
  updateIsModalVisible,
  updateSelectedSpamType,
};
