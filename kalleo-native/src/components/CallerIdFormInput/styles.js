import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginTop: '3%',
    marginBottom: '3%',
  },
  label: {
    color: '$grayDarkLabel',
    fontSize: '$fontSmall',
    lineHeight: 28,
  },
  input: {
    backgroundColor: '$grayInputBackground',
    borderRadius: '$actionBorderRadius',
    padding: '4%',
  },
});

export default styles;
