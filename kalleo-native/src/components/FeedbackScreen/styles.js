import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    height: '100%',
  },
  feedbackContainer: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  headerContainer: {
    margin: '10%',
  },
  header: {
    color: '$primaryColor',
    fontSize: '$fontLarge',
    marginBottom: '5%',
    textAlign: 'center',
  },
  subheader: {
    textAlign: 'center',
  },
  input: {
    backgroundColor: '$grayInputBackground',
    borderRadius: 5,
    height: '30%',
    marginTop: '2%',
    padding: '3%',
  },
  sendButtonContainer: {
    marginTop: '10%',
  },
});
