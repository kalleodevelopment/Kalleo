import { connect } from 'react-redux';
import BusinessForm from '../../components/Registration/BusinessForm';
import { operationNames } from '../../apollo';
import {
  registrationSteps,
  setRegistrationBusinessName,
  setRegistrationStep,
} from '../../redux';

const mapStateToProps = ({ loadingMutations, registration }) => {
  const { businessDetails, lineType, phoneNumber } = registration;
  const { name } = businessDetails;

  const isSubmitting = loadingMutations[operationNames.updateBusinessListing] || false;

  return {
    isSubmitting,
    lineType,
    name,
    phoneNumber,
    isSubmitDisabled: isSubmitting || !name,
  };
};

const mapDispatchToProps = dispatch => ({
  onChangeName: name => dispatch(setRegistrationBusinessName(name)),

  onSubmit: () => dispatch(setRegistrationStep(registrationSteps.COMPLETED)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm);
