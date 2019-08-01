import EStyleSheet from 'react-native-extended-stylesheet';

const sharedStyles = {
  color: '$linkColor',
  fontSize: '$fontMedium',
  textAlign: 'center',
};

const wrapper = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = EStyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontSize: '$fontLarge',
    textAlign: 'center',
  },
  verifyCodeSentWrapper: {
    ...wrapper,
  },
  text: {
    ...sharedStyles,
  },
  phoneNumber: {
    ...sharedStyles,
    fontWeight: 'bold',
  },
  wrongNumberWrapper: {
    ...wrapper,
    paddingBottom: '3%',
  },
  goBack: {
    ...sharedStyles,
    textDecorationLine: 'underline',
  },
});

export default styles;

