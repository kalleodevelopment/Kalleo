import to from 'await-to-js';
import { bind } from 'decko';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CallerIdForm from './CallerIdForm';
import { updateConsumerListing } from '../../apollo';
import { handleError } from '../../helpers';

@graphql(updateConsumerListing)
class ConsumerForm extends Component {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    isSubmitDisabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    lineType: PropTypes.string.isRequired,
    onChangeFirstName: PropTypes.func.isRequired,
    onChangeLastName: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }

  @bind
  async onSubmit(e) {
    e.preventDefault();

    const {
      firstName,
      lastName,
      lineType,
      mutate,
      onSubmit,
    } = this.props;

    const [error] = await to(mutate({
      variables: {
        input: {
          lineType,
          firstName: firstName || null,
          lastName: lastName || null,
        },
      },
    }));

    if (error) {
      handleError(error);
    } else {
      onSubmit();

      localStorage.removeItem('authToken');
    }
  }

  render() {
    const {
      firstName,
      lastName,
      isSubmitDisabled,
      isSubmitting,
      onChangeFirstName,
      onChangeLastName,
      phoneNumber,
    } = this.props;

    return (
      <CallerIdForm
        fields={[
          {
            label: 'First name',
            onChange: onChangeFirstName,
            placeholder: 'Enter your first name',
            value: firstName,
          },
          {
            label: 'Last name',
            onChange: onChangeLastName,
            placeholder: 'Enter your last name',
            value: lastName,
          },
        ]}
        isSubmitting={isSubmitting}
        isSubmitDisabled={isSubmitDisabled}
        onSubmit={this.onSubmit}
        phoneNumber={phoneNumber}
      />
    );
  }
}

export default ConsumerForm;
