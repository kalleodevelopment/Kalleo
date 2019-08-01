import { connect } from 'react-redux';
import ConsumerForm from '../../components/Registration/ConsumerForm';
import { operationNames } from '../../apollo';
import {
  registrationSteps,
  setRegistrationStep,
  setRegistrationConsumerFirstName,
  setRegistrationConsumerLastName,
} from '../../redux';

const mapStateToProps = ({ loadingMutations, registration }) => {
  const { consumerDetails, lineType, phoneNumber } = registration;
  const { firstName, lastName } = consumerDetails;

  const isSubmitting = loadingMutations[operationNames.updateConsumerListing] || false;

  return {
    firstName,
    isSubmitting,
    lastName,
    lineType,
    phoneNumber,
    isSubmitDisabled: isSubmitting || !firstName || !lastName,
  };
};

const mapDispatchToProps = dispatch => ({
  onChangeFirstName: firstName => dispatch(setRegistrationConsumerFirstName(firstName)),

  onChangeLastName: lastName => dispatch(setRegistrationConsumerLastName(lastName)),

  onSubmit: () => dispatch(setRegistrationStep(registrationSteps.COMPLETED)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerForm);
