import updateValuePropsCurrentStep from '../../redux/actions/value-props';

export const mapStateToProps = ({
  valueProps: {
    currentStep,
    valuePropsCompleted,
  },
}) => ({
  currentStep,
  valuePropsCompleted,
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentStep: nextStep => dispatch(updateValuePropsCurrentStep(nextStep)),
});
