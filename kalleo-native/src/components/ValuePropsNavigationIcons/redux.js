import updateValuePropsCurrentStep from '../../redux/actions/value-props';

export const mapStateToProps = ({
  valueProps: {
    currentStep,
    valueProps,
  },
}) => ({
  currentStep,
  valueProps,
});

export const mapDispatchToProps = dispatch => ({
  updateCurrentStep: nextStep => dispatch(updateValuePropsCurrentStep(nextStep)),
});
