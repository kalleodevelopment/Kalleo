import EStyleSheet from 'react-native-extended-stylesheet';

const button = {
  backgroundColor: '$white',
  borderWidth: 1,
  marginBottom: '5%',
};

const text = {
  fontWeight: 'normal',
};

export default EStyleSheet.create({
  container: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
  },
  button: {
    ...button,
    borderColor: '$grayDisabled',
    flex: 1,
  },
  selectedButton: {
    ...button,
    borderColor: '$primaryColor',
  },
  text: {
    ...text,
    color: '$grayDarkLabel',
  },
  selectedText: {
    ...text,
    color: '$primaryColor',
  },
});

