import actions from '../actions/types';
import valuePropsConstants from '../../constants/valueProps';

const initialState = {
  currentStep: 0,
  totalSteps: valuePropsConstants.length,
  valueProps: valuePropsConstants,
  valuePropsCompleted: false,
};

const valueProps = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_VALUE_PROPS_CURRENT_STEP: {
      const { nextStep } = action;
      const valuePropsCompleted = nextStep === state.totalSteps - 1;

      return {
        ...state,
        valuePropsCompleted,
        currentStep: nextStep,
      };
    }
    default:
      return state;
  }
};

export default valueProps;
