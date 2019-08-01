import React from 'react';
import ResponsiveImage from 'react-native-responsive-image';
import PropTypes from 'prop-types';

const NavigationIcon = ({ icon, tintColor }) => (
  <ResponsiveImage
    initWidth={25}
    initHeight={25}
    source={icon}
    style={{ tintColor }}
  />
);

NavigationIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  tintColor: PropTypes.string.isRequired,
};

const getNavigationOptions = ({ icon, label, isVisible }) => ({
  tabBarLabel: label,
  tabBarVisible: isVisible,
  tabBarIcon: ({ ...props }) => <NavigationIcon icon={icon} {...props} />,
});

export default getNavigationOptions;
