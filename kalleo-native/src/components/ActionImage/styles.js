import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '12%',
    marginRight: '12%',
  },
  text: {
    color: '#6d6d6d',
    paddingTop: 14,
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
  },
  active: {
    tintColor: '$primaryColor',
  },
});

export default styles;
