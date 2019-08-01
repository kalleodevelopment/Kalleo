import PropTypes from 'prop-types';
import React from 'react';

const CallerIdForm = ({
  fields,
  isSubmitDisabled,
  isSubmitting,
  onSubmit,
  phoneNumber,
}) => (
  <div className="common__vertical-center">
    <form className="registration__step-container" onSubmit={onSubmit}>
      <p className="caller-id-form__heading">
        Congratulations! Your phone is verified.
      </p>
      <p className="caller-id-form__subheading">
        Please complete your caller ID information:
      </p>
      <fieldset className="caller-id-form__text-fields">
        <span className="caller-id-form__text-field-label">
          Phone Number
        </span>
        <input
          className="common__text-field caller-id-form__text-field"
          disabled
          type="text"
          value={phoneNumber}
        />
        {fields.map(({ label, onChange, placeholder, value }) => (
          <div key={label}>
            <span className="caller-id-form__text-field-label">
              {label}
            </span>
            <input
              className="common__text-field caller-id-form__text-field"
              onChange={e => onChange(e.target.value)}
              maxLength="255"
              placeholder={placeholder}
              type="text"
              value={value || ''}
            />
          </div>
        ))}
      </fieldset>
      <button
        className="common__action-btn"
        disabled={isSubmitDisabled}
        type="submit"
      >
        {isSubmitting ? 'Please wait...' : 'Register'}
      </button>
      <p className="caller-id-form__fine-print">
        Note: This caller ID will be used when calling kalleo users.
        Spoofing or abuses of the caller ID system could result in
        your phone number being blocked or flagged for kalleo users.
      </p>
    </form>
  </div>
);

CallerIdForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default CallerIdForm;
