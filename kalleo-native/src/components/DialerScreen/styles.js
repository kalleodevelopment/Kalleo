import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    height: '100%',
  },
  dialerContainer: {
    paddingTop: '10%',
    '@media android': {
      paddingTop: '5%',
    },
  },
  digitsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  callButtonContainer: {
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  '@media (max-width: 320)': {
    container: {
      paddingTop: '5%',
    },
    digitsContainer: {
      marginLeft: 0,
      marginRight: 0,
    },
    callButtonContainer: {
      marginTop: 0,
    },
  },
});
