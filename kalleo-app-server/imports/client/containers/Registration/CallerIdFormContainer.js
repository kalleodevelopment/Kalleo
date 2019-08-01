import React from 'react';
import { connect } from 'react-redux';
import BusinessFormContainer from './BusinessFormContainer';
import ConsumerFormContainer from './ConsumerFormContainer';
import { listingTypes } from '../../redux';

const formComponents = {
  [listingTypes.BUSINESS]: BusinessFormContainer,
  [listingTypes.CONSUMER]: ConsumerFormContainer,
};

const mapStateToProps = ({ registration }) => {
  const Form = formComponents[registration.listingType];

  return {
    children: Form ? <Form /> : null,
  };
};

export default connect(mapStateToProps)(({ children }) => children);
