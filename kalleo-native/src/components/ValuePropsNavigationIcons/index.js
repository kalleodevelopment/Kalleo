import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { times } from 'lodash';
import { mapDispatchToProps, mapStateToProps } from './redux';
import styles from './styles';

const ValuePropsNavigationIcons = ({
  currentStep,
  updateCurrentStep,
  valueProps,
}) => (
  <View style={styles.container}>
    {times(valueProps.length, (index) => {
      const isActive = currentStep === index;

      return (
        <TouchableOpacity key={index} onPress={() => updateCurrentStep(index)}>
          <View style={[styles.icon, isActive ? styles.activeIcon : null]} />
        </TouchableOpacity>
      );
    })}
  </View>
);

ValuePropsNavigationIcons.propTypes = {
  currentStep: PropTypes.number.isRequired,
  updateCurrentStep: PropTypes.func.isRequired,
  valueProps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValuePropsNavigationIcons);
