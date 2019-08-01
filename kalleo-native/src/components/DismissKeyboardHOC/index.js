import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import styles from '../../styles/container';

const DismissKeyboardHOC = (
  Component,
  {
    containerType,
    behavior,
  } = {
    behavior: 'position',
  },
) => (
  ({ keyboardVerticalOffset, children, ...props }) => ( // eslint-disable-line react/prop-types
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles[containerType] ? styles[containerType] : null}>
        <KeyboardAvoidingView
          behavior={behavior}
          keyboardVerticalOffset={Platform.OS === 'android' ? keyboardVerticalOffset : 0}
        >
          <Component {...props}>{children}</Component>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
);

export default DismissKeyboardHOC;
