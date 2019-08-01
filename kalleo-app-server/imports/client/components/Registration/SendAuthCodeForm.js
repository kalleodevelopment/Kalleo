import PropTypes from 'prop-types';
import React from 'react';
import PhoneNumberInput from 'react-phone-number-input';
import SendAuthCodeButton from './SendAuthCodeButton';

const SendAuthCodeForm = ({
  isBusiness,
  isMobile,
  isResidentialLandline,
  isSubmitting,
  lineType,
  onChangePhoneNumber,
  onSendAuthCode,
  onToggleIsBusiness,
  onToggleIsMobile,
  onToggleIsResidentialLandline,
  phoneNumber,
}) => (
  <div className="common__vertical-center send-auth-code__bg">
    <div className="registration__step-container">
      <h1 className="common__h1">
        Welcome to kalleo, a mobile phone identifying service
      </h1>
      <p className="send-auth-code__p">
        Registering your caller ID for kalleo users is simple, safe and easy.
        <br />
        <br />
        <br />
      </p>
      <p className="send-auth-code__p">
        First, let’s verify your phone:
      </p>
      <br />
      <PhoneNumberInput
        country="US"
        flagComponent={({ countryCode }) => (
          <span>{countryCode}</span>
        )}
        onChange={number => onChangePhoneNumber(number)}
        placeholder="Enter phone number"
        value={phoneNumber}
      />
      <fieldset className="send-auth-code__radio-btns">
        {[
            {
              checked: isMobile,
              id: 'is-mobile',
              label: 'This is a mobile phone',
              onChange: onToggleIsMobile,
            },
            {
              checked: isBusiness,
              id: 'is-business',
              label: 'This is a business line',
              onChange: onToggleIsBusiness,
            },
            {
              checked: isResidentialLandline,
              id: 'is-residential-landline',
              label: 'This is a residential land line',
              onChange: onToggleIsResidentialLandline,
            },
          ].map(({ checked, id, label, onChange }) => (
            <div key={id}>
              <label htmlFor={`send-auth-code${id}`}>
                <input
                  checked={checked}
                  className="send-auth-code__radio-btn"
                  id={`send-auth-code${id}`}
                  name="phone-number-type"
                  onChange={onChange}
                  type="radio"
                />
                {label}
              </label>
            </div>
          ))}
      </fieldset>
      <SendAuthCodeButton
        className="common__action-btn"
        disabled={isSubmitting}
        lineType={lineType}
        phoneNumber={phoneNumber}
        onClick={onSendAuthCode}
        text={isSubmitting ? 'Please wait...' : 'Get started'}
      />
    </div>
  </div>
);

SendAuthCodeForm.propTypes = {
  isBusiness: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isResidentialLandline: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  lineType: PropTypes.string.isRequired,
  onChangePhoneNumber: PropTypes.func.isRequired,
  onSendAuthCode: PropTypes.func.isRequired,
  onToggleIsBusiness: PropTypes.func.isRequired,
  onToggleIsMobile: PropTypes.func.isRequired,
  onToggleIsResidentialLandline: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
};

SendAuthCodeForm.defaultProps = {
  phoneNumber: undefined,
};

export default SendAuthCodeForm;
