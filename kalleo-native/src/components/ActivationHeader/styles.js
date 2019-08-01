import EStyleSheet from 'react-native-extended-stylesheet';

const sharedTextStyles = {
  color: '$white',
  lineHeight: 25,
};

const styles = subscriberAccountIncomplete => EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$primaryColor',
    padding: '10%',
    paddingBottom: '5%',
    paddingTop: subscriberAccountIncomplete ? '10%' : '5%',
  },
  header: {
    ...sharedTextStyles,
    fontSize: '$fontXXLarge',
  },
  subheader: {
    ...sharedTextStyles,
    fontSize: '$fontMedium',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '$white',
    marginTop: '10%',
  },
  buttonText: {
    color: '$primaryColor',
  },
});

export default styles;
