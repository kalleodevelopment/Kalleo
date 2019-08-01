import to from 'await-to-js';
import { bind } from 'decko';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CallerIdForm from './CallerIdForm';
import { updateBusinessListing } from '../../apollo';
import { handleError } from '../../helpers';

@graphql(updateBusinessListing)
class BusinessForm extends Component {
  static propTypes = {
    isSubmitDisabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    lineType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }

  @bind
  async onSubmit(e) {
    e.preventDefault();

    const { lineType, mutate, name, onSubmit } = this.props;

    const [error] = await to(mutate({
      variables: {
        input: {
          lineType,
          name: name || null,
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
      isSubmitting,
      isSubmitDisabled,
      name,
      onChangeName,
      phoneNumber,
    } = this.props;

    return (
      <CallerIdForm
        fields={[
          {
            label: 'Business name',
            onChange: onChangeName,
            placeholder: 'Enter the name of your business',
            value: name,
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

export default BusinessForm;
