import { connect } from 'react-redux';
import SendAuthCodeForm from '../../components/Registration/SendAuthCodeForm';
import { operationNames } from '../../apollo';
import {
  lineTypes,
  listingTypes,
  registrationSteps,
  setRegistrationLineType,
  setRegistrationListingType,
  setRegistrationPhoneNumber,
  setRegistrationStep,
} from '../../redux';

const mapStateToProps = ({ loadingMutations, registration }) => {
  const { lineType, listingType, phoneNumber } = registration;

  return {
    lineType,
    phoneNumber,
    isSubmitting: loadingMutations[operationNames.sendAuthCode] || false,
    isBusiness: lineType === lineTypes.LANDLINE && listingType === listingTypes.BUSINESS,
    isMobile: lineType === lineTypes.MOBILE && listingType === listingTypes.CONSUMER,
    isResidentialLandline: lineType === lineTypes.LANDLINE && listingType === listingTypes.CONSUMER,
  };
};

const setLineAndListingTypes = ({ lineType, listingType }) => (
  (dispatch) => {
    dispatch(setRegistrationLineType(lineType));
    dispatch(setRegistrationListingType(listingType));
  }
);

const mapDispatchToProps = dispatch => ({
  onChangePhoneNumber: phoneNumber => dispatch(setRegistrationPhoneNumber(phoneNumber || '')),

  onSendAuthCode: () => dispatch(setRegistrationStep(registrationSteps.VERIFY_AUTH_CODE)),

  onToggleIsMobile: () => {
    dispatch(setLineAndListingTypes({
      lineType: lineTypes.MOBILE,
      listingType: listingTypes.CONSUMER,
    }));
  },

  onToggleIsBusiness: () => {
    dispatch(setLineAndListingTypes({
      lineType: lineTypes.LANDLINE,
      listingType: listingTypes.BUSINESS,
    }));
  },

  onToggleIsResidentialLandline: () => {
    dispatch(setLineAndListingTypes({
      lineType: lineTypes.LANDLINE,
      listingType: listingTypes.CONSUMER,
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SendAuthCodeForm);
