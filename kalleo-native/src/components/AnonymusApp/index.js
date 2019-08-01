import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AnonymousScreens } from '../../routes';
import getActiveRoute from '../../helpers/getActiveRoute';
import mapDispatchToProps from './redux';

const AnonymousApp = ({ updateActiveRoute }) => (
  <AnonymousScreens
    onNavigationStateChange={(prev, current) => updateActiveRoute(getActiveRoute(current))}
  />
);

AnonymousApp.propTypes = {
  updateActiveRoute: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AnonymousApp);
