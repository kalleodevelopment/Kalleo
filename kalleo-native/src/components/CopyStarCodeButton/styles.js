import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    color: '$white',
    fontSize: '$fontMedium',
    textAlign: 'center',
  },
});

export default styles;
