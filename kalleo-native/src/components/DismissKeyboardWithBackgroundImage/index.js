import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View, KeyboardAvoidingView } from 'react-native';
import BackgroundImage from '../BackgroundImage';
import styles from '../../styles/container';

const DismissKeyboardWithBackgroundImage = (Component, containerType, backgroundImage) => (
  ({ children, ...props }) => ( // eslint-disable-line react/prop-types
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles[containerType] ? styles[containerType] : null}>
        <BackgroundImage source={backgroundImage}>
          <KeyboardAvoidingView behavior="position">
            <Component {...props}>{children}</Component>
          </KeyboardAvoidingView>
        </BackgroundImage>
      </View>
    </TouchableWithoutFeedback>
  )
);

export default DismissKeyboardWithBackgroundImage;
