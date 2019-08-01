import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: '5%',
  },
  text: {
    color: '$linkColor',
    fontSize: '$fontMedium',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default styles;
