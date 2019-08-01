import PropTypes from 'prop-types';
import React from 'react';

const Registration = ({ children }) => (
  <div className="registration__container">
    {children}
  </div>
);

Registration.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Registration;
