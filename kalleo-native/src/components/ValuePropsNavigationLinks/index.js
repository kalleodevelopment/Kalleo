import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import KalleoTextTouchable from '../KalleoTextTouchable';
import { onboardRoutes } from '../../constants/routes';
import { mapDispatchToProps, mapStateToProps } from './redux';
import styles from './styles';

@withNavigation
@connect(mapStateToProps, mapDispatchToProps)
class ValuePropsNavigationLinks extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    updateCurrentStep: PropTypes.func.isRequired,
    valuePropsCompleted: PropTypes.bool.isRequired,
  };

  onNextClick = () => {
    const {
      currentStep,
      navigation: {
        navigate,
      },
      updateCurrentStep,
      valuePropsCompleted,
    } = this.props;

    if (!valuePropsCompleted) {
      updateCurrentStep(currentStep + 1);
    } else {
      navigate(onboardRoutes.CREATE_CALLER_ID_SCREEN);
    }
  }

  onSkipClick = () => {
    const { navigation: { navigate } } = this.props;

    navigate(onboardRoutes.CREATE_CALLER_ID_SCREEN);
  }

  render = () => (
    <View style={styles.container}>
      <KalleoTextTouchable
        onPress={this.onSkipClick}
        textStyles={styles.skip}
        text="Skip"
      />
      <KalleoTextTouchable
        onPress={this.onNextClick}
        textStyles={styles.next}
        text="Next"
      />
    </View>
  )
}

export default ValuePropsNavigationLinks;
