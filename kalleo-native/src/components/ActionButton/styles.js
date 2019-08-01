import EStyleSheet from 'react-native-extended-stylesheet';

const buttonContainer = {
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '$actionBorderRadius',
  flex: 0.8,
  flexDirection: 'row',
  height: 50,
  justifyContent: 'center',
  padding: 5,
};

const text = {
  fontSize: '$fontMedium',
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    ...buttonContainer,
    backgroundColor: '$primaryColor',
  },
  buttonDisabled: {
    ...buttonContainer,
    backgroundColor: '$transparent',
    borderColor: '$grayDisabled',
    borderWidth: 1,
  },
  text: {
    ...text,
    color: '$white',
    fontFamily: 'QuicksandBold-Regular',
    textAlign: 'center',
    flex: 1,
  },
  textDisabled: {
    ...text,
    color: '$grayDisabled',
    fontFamily: 'QuicksandBold-Regular',
  },
  icon: {
    width: 20,
    flex: 1,
  },
});

export default styles;
