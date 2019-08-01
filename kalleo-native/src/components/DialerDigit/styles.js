import EStyleSheet from 'react-native-extended-stylesheet';

const text = {
  color: '$primaryColor',
};

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: '$primaryColor',
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'column',
    height: 50,
    justifyContent: 'center',
    margin: 15,
    width: 50,
    padding: 2,
  },
  digit: {
    ...text,
    fontSize: '$fontXLarge',
  },
  alphabet: {
    ...text,
  },
  '@media (max-width: 320)': {
    container: {
      margin: 10,
    },
    alphabet: {
      fontSize: '$fontMini',
    },
  },
});
