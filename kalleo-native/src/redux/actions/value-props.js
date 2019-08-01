import actions from './types';

const updateValuePropsCurrentStep = nextStep => ({
  nextStep,
  type: actions.UPDATE_VALUE_PROPS_CURRENT_STEP,
});

export default updateValuePropsCurrentStep;
